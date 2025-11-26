/* eslint-disable no-shadow */
import * as React from 'react';
import { set, unset } from 'sanity';
import { Stack, Flex, Box, TextInput, Select, Button } from '@sanity/ui';
import stripTitleTags from '../../helpers/stripTitleTags';
import { ComponentType } from 'react';
import { StringInputProps, StringSchemaType } from 'sanity';

const defaultTag = 'h2'; // default tag if nothing has been set in options
const options = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span'] as const;
type Option = (typeof options)[number];

export const TitleInput: ComponentType<StringInputProps<StringSchemaType>> = props => {
  const { elementProps, onChange, value = '', schemaType } = props;
  const { defaultTag: defaultTagFromOptions } = schemaType.options || {};

  // Get tag name from the input value
  const getTagName = (value: string): Option => {
    const div = document.createElement('div');
    div.innerHTML = value;
    const headingElement: any = div.firstChild;
    const headingElementTag = headingElement?.tagName;
    return headingElementTag?.toLowerCase() || defaultTagFromOptions || defaultTag;
  };

  const initialHeadingType = value ? getTagName(value) : defaultTagFromOptions || defaultTag;
  const [renderedValue, setRenderedValue] = React.useState<string>(stripTitleTags(value));
  const [headingType, setHeadingType] = React.useState<Option>(initialHeadingType);

  // Handle radio button changes
  const handleButtonClick = (option: Option) => {
    const newHeadingType = option;
    if (headingType !== newHeadingType) {
      setHeadingType(newHeadingType);
      // Save heading type to state so we can access it when updating the text input
      if (renderedValue) {
        onChange(set(`<${newHeadingType}>${renderedValue}</${newHeadingType}>`));
      }
    }
  };
  // Handle text input changes
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTextValue = e.currentTarget.value;
    if (!newTextValue) {
      onChange(unset());
    } else if (headingType) {
      onChange(set(`<${headingType}>${newTextValue}</${headingType}>`));
    } else {
      onChange(set(newTextValue));
    }
    // Save rendered text value to state so we can access it when clicking a radio button
    setRenderedValue(stripTitleTags(newTextValue));
  };
  return (
    <Stack>
      <Flex gap={1}>
        <Box>
          <Select
            onChange={e => {
              const target = e.target as HTMLSelectElement;
              const selectedOption = target.value as Option;
              handleButtonClick(selectedOption);
            }}
          >
            {options.map((option, i) => {
              const isActive = headingType === option;
              return (
                <option key={option} value={option} selected={isActive}>
                  {option}
                </option>
              );
            })}
          </Select>
        </Box>
        <Box flex={1}>
          <TextInput {...elementProps} onChange={handleTextChange} value={renderedValue} />
        </Box>
        {/* Quick update button */}
        {/* <Box>
          <Button padding={2} onClick={() => onChange(set(`<${headingType}>${renderedValue}</${headingType}>`))}>
            Update
          </Button>
        </Box> */}
      </Flex>
      {/* Debug value */}
      {/* <div style={{ position: 'absolute', fontSize: '10px', top: '100%' }}>Value: {value}</div> */}
    </Stack>
  );
};
