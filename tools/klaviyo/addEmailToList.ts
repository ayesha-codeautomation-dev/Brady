const KLAVIYO_PRIVATE_API_KEY = process.env.KLAVIYO_PRIVATE_API_KEY!;
const KLAVIYO_LIST_ID = process.env.KLAVIYO_LIST_ID!;
const KLAVIYO_API_REVISION = '2024-05-15';

type AddEmailToListResponse = {
  status: 'success' | 'error';
  message: string;
  data?: {
    profileId: string;
    listId: string;
  };
};

const addEmailToList = async (data: { email?: string }): Promise<AddEmailToListResponse> => {
  try {
    const { email } = data || {};

    if (!email) {
      throw new Error('Email is required to create a profile.');
    }

    const response = await fetch(`https://a.klaviyo.com/api/profiles/`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        revision: KLAVIYO_API_REVISION,
        Authorization: `Klaviyo-API-Key ${KLAVIYO_PRIVATE_API_KEY}`
      },
      body: JSON.stringify({
        data: {
          type: 'profile',
          attributes: {
            email
          }
        }
      })
    });

    const responseData = await response.json();

    let profileId;

    if (!response.ok) {
      const errors = responseData?.errors;
      if (errors) {
        const duplicateProfileError = errors.find((error: any) => error.code === 'duplicate_profile');
        if (duplicateProfileError) {
          profileId = duplicateProfileError.meta?.duplicate_profile_id;
        } else {
          throw new Error('Failed to create profile.');
        }
      }
    } else {
      profileId = responseData.data.id;
    }

    // Subscribe profile to list
    const subscribeResponse = await fetch(
      `https://a.klaviyo.com/api/lists/${KLAVIYO_LIST_ID}/relationships/profiles/`,
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          revision: KLAVIYO_API_REVISION,
          Authorization: `Klaviyo-API-Key ${KLAVIYO_PRIVATE_API_KEY}`
        },
        body: JSON.stringify({
          data: [{ type: 'profile', id: profileId }]
        })
      }
    );

    if (subscribeResponse?.ok) {
      return {
        status: 'success',
        message: 'Profile subscribed to list',
        data: { profileId: profileId, listId: KLAVIYO_LIST_ID }
      };
    }

    const subscribeData = await subscribeResponse.json();
    throw new Error(subscribeData.errors?.[0]?.detail || 'Failed to subscribe profile.');
  } catch (error: any) {
    return {
      status: 'error',
      message: error.message || 'Unexpected error occurred.'
    };
  }
};

export default addEmailToList;
