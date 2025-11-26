import * as React from 'react';
import { useState, useCallback, useEffect, useRef } from 'react';
import { TextInput, Dialog, Text, Card, Button, Flex } from '@sanity/ui';
import { FiSearch } from 'react-icons/fi';
import { ComponentType } from 'react';
import { ObjectInputProps, ObjectSchemaType } from 'sanity';

import './SectionLibrary.css';

function generateRandomKey() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomKey = '';

  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomKey += characters.charAt(randomIndex);
  }

  return randomKey;
}

export const SectionLibrary: ComponentType<ObjectInputProps<ObjectSchemaType>> = props => {
  const { onChange, onInsert, schemaType, value: selectedSections = [] } = props;

  // Once you have created a page and filled out the content for each section, you can view the sections data
  // by uncommenting the console.log below and use this to create a template in the sanity/schemas/templates folder.
  // This template should get added to the options in the Section Templates modal.

  // Refs
  const sectionsArrayUiRef = useRef<HTMLDivElement>();

  // State
  const [templatesModalOpen, setTemplatesModalOpen] = useState(false);
  const onTemplatesClose = useCallback(() => setTemplatesModalOpen(false), []);
  const onTemplatesOpen = useCallback(() => setTemplatesModalOpen(true), []);

  const [libraryModalOpen, setLibraryModalOpen] = useState(false);
  const onLibraryClose = useCallback(() => setLibraryModalOpen(false), []);
  const onLibraryOpen = useCallback(() => setLibraryModalOpen(true), []);

  // value is the current objects in the sections array
  const sections = schemaType?.of || [];

  // Hide default Add Item button
  useEffect(() => {
    if (sectionsArrayUiRef.current) {
      const addItemButton: HTMLButtonElement = sectionsArrayUiRef.current.querySelector(
        '.sectionLibraryUi > div[data-ui="Stack"] > div[data-ui="Grid"] > button'
      );
      addItemButton.style.display = 'none';
    }
  }, []);

  // Search
  const [searchInput, setSearchInput] = useState('');
  const filteredSections = sections
    .filter(section => section.title.toLowerCase().includes(searchInput.toLowerCase()))
    .sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();

      if (titleA < titleB) {
        return -1;
      }
      if (titleA > titleB) {
        return 1;
      }
      return 0;
    });

  return (
    <div className="sectionLibrary" ref={sectionsArrayUiRef}>
      <div className="sectionLibraryUi">{props.renderDefault(props)}</div>
      <Flex gap={3}>
        <Button paddingY={2} paddingX={3} onClick={onLibraryOpen} mode="ghost">
          <Flex align="center" gap={1}>
            <svg
              data-sanity-icon="add"
              width="1.3em"
              height="1.3em"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.5 5V20M5 12.5H20" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
            </svg>
            <Text size={1} weight="medium">
              Add Section
            </Text>
          </Flex>
        </Button>
      </Flex>
      {libraryModalOpen && (
        <LibraryModal
          onClose={onLibraryClose}
          onInsert={onInsert}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          filteredSections={filteredSections}
        />
      )}
    </div>
  );
};

type LibraryModalProps = {
  onClose: () => void;
  onInsert: (options: any) => void;
  searchInput: string;
  setSearchInput: (value: string) => void;
  filteredSections: any[];
};

const LibraryModal: React.FC<LibraryModalProps> = props => {
  const { onClose, onInsert, searchInput, setSearchInput, filteredSections } = props;

  const handleSelection = (sectionName: string) => {
    const newSection = {
      _key: generateRandomKey(),
      _type: sectionName
    };
    // https://github.com/sanity-io/sanity/blob/22f4ce49809dd01581036c646e55609e314d1e49/packages/sanity/src/core/form/members/object/fields/ArrayOfObjectsField.tsx#L332-L337
    // onInsert maps to the handleInsert function in the ArrayOfObjectsField.tsx file
    onInsert({
      items: [newSection],
      position: 'after',
      referenceItem: -1,
      open: true
    });
    onClose();
  };

  return (
    <Dialog id="sectionDialog" className="sectionDialog" header="Select a section" onClose={onClose} zOffset={25002}>
      <div className="searchContainer">
        <TextInput
          value={searchInput}
          onChange={event => setSearchInput(event.currentTarget.value)}
          placeholder="Search..."
          icon={FiSearch}
        />
      </div>
      {filteredSections?.length > 0 ? (
        <div className="sectionsContainer">
          {filteredSections.map(section => {
            const sectionPreviewField = section?.fields?.find(field => field.name === 'sectionPreview');
            const imageUrl = sectionPreviewField?.type?.imageUrl;
            return (
              <button key={section?.name} className="sectionItem" onClick={() => handleSelection(section.name)}>
                <span
                  style={{
                    color: 'black',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    fontSize: '16px',
                    fontWeight: 500
                  }}
                  className="label"
                >
                  {section?.title}
                </span>
                {imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={imageUrl}
                    alt="Read-Only Image"
                    style={{
                      maxWidth: '300px',
                      width: '100%',
                      height: 'auto',
                      backgroundColor: '#fff'
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      ) : (
        <Card padding={[5, 5, 5]}>
          <Text align="center" size={[2, 2, 3]}>
            No results found
          </Text>
        </Card>
      )}
    </Dialog>
  );
};
