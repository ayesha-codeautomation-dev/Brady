const KLAVIYO_PRIVATE_API_KEY = process.env.KLAVIYO_PRIVATE_API_KEY!;
const KLAVIYO_LIST_ID = process.env.KLAVIYO_LIST_ID!;
const KLAVIYO_API_REVISION = '2024-05-15';

type SubmitFormResponse = {
  status: 'success' | 'error';
  message: string;
  data?: {
    profileId: string;
    listId: string;
  };
};

const submitForm = async (data: {
  email?: string;
  message?: string;
  firstName?: string;
  lastName?: string;
  formName?: string;
}): Promise<SubmitFormResponse> => {
  try {
    const { email, firstName, lastName, message = '', formName } = data || {};

    if (!email || !firstName || !lastName || !formName) {
      throw new Error('Email is required to create a profile.');
    }

    const response = await fetch('https://a.klaviyo.com/api/events/', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        revision: KLAVIYO_API_REVISION,
        Authorization: `Klaviyo-API-Key ${KLAVIYO_PRIVATE_API_KEY}`
      },
      body: JSON.stringify({
        data: {
          type: 'event',
          attributes: {
            properties: {
              form_name: formName,
              inquiry_type: 'General Inquiry',
              message: message
            },
            metric: {
              data: {
                type: 'metric',
                attributes: {
                  name: 'Form Submission'
                }
              }
            },
            profile: {
              data: {
                type: 'profile',
                attributes: {
                  email: email,
                  first_name: firstName,
                  last_name: lastName
                }
              }
            },
            time: new Date().toISOString()
          }
        }
      })
    });

    if (!response.ok) {
      const responseData = await response.json();
      throw new Error(responseData.errors?.[0]?.detail || 'Failed to subscribe profile.');
    }

    return {
      status: 'success',
      message: 'Form submitted successfully'
    };
  } catch (error: any) {
    return {
      status: 'error',
      message: error.message || 'Unexpected error occurred.'
    };
  }
};

export default submitForm;
