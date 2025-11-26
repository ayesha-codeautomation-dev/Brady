import * as React from 'react';
import { Stack, Box, Text, Flex, Button, useToast } from '@sanity/ui';
import { SlugInputProps, useDocumentOperation, useFormValue } from 'sanity';

const SlugInput = (props: SlugInputProps) => {
  const { prefix = '' } = props.schemaType.options as SlugInputProps['schemaType']['options'] & {
    prefix?: string;
  };

  // @ts-ignore
  const { _id, _type } = useFormValue([]);
  const toast = useToast();
  const { patch } = useDocumentOperation(_id.replace(/^drafts\./, ''), _type);

  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const input = ref.current?.querySelector('input[type="text"]') as HTMLInputElement | null;
    const generateButton = ref.current?.querySelector('button');
    if (input && generateButton) {
      const onBlur = (e: Event) => {
        const target = e.currentTarget as HTMLInputElement;
        // Only update after user stops typing for 500ms
        patch.execute([{ set: { pathname: `${prefix}${target.value}` } }]);
      };
      const onClick = (e: Event) => {
        // Wait for input to update (assuming field updates within 500ms)
        setTimeout(() => {
          patch.execute([{ set: { pathname: `${prefix}${input.value}` } }]);
        }, 500);
      };
      input.addEventListener('blur', onBlur);
      generateButton.addEventListener('click', onClick);
      return () => {
        input.removeEventListener('blur', onBlur);
        generateButton.removeEventListener('click', onClick);
      };
    }
  }, [prefix, patch]);

  return (
    <Stack>
      <Flex>
        {prefix && (
          <Box
            padding={3}
            style={{
              backgroundColor: '#eee',
              boxShadow: 'inset 0 1px 0 0 #c1c1c1, inset 0 -1px 0 0 #c1c1c1, inset 1px 0 0 0 #c1c1c1',
              cursor: 'default'
            }}
            title="Slug prefix"
          >
            <Text style={{ color: '#444' }}>{prefix}</Text>
          </Box>
        )}
        <Box flex={1} ref={ref}>
          {props.renderDefault(props)}
        </Box>
        {/* <Box marginLeft={1}>
          <Button
            height="100%"
            paddingX={3}
            onClick={() =>
              toast.push({
                status: 'success',
                title: 'Slug saved!'
              })
            }
            mode="ghost"
          >
            <Flex align="center" gap={1}>
              <Text size={1} weight="medium">
                Save
              </Text>
            </Flex>
          </Button>
        </Box> */}
      </Flex>
    </Stack>
  );
};

export default SlugInput;
