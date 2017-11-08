import classNames from 'classnames';
import Downshift from 'downshift'
import React from 'react'

import './Autocomplete.css';

let renderCount = 0;

const items = [
  'BrooklynJS',
  'JerseyScript',
  'ManhattanJS',
  'QueensJS',
]

const selectedOption = (optionValue) => {
  console.log(`%cselected ${optionValue}`, 'font-weight: bold;');
}

const Autocomplete = () => (
  <Downshift onChange={selectedOption}>
    {({
      getInputProps,
      getItemProps,
      getLabelProps,
      isOpen,
      inputValue,
      highlightedIndex,
      selectedItem,
    }) => {
      console.group(`render ${++renderCount}`);
      console.log('label props', getLabelProps());
      console.log('input props', getInputProps());
      console.log('item 0 props', getItemProps({ item: items[0] }));
      console.groupEnd();

      const lowercaseInputValue = inputValue.toLowerCase();
      const filteredItems = items
        .filter(i => !inputValue || i.toLowerCase().includes(lowercaseInputValue));

      return (
        <div className='Autocomplete'>
          <label className='Autocomplete-label' {...getLabelProps() }>Search meetup</label>
          <input
            autoComplete='off'
            autoCorrect='off'
            spellCheck='false'
            className='Autocomplete-input' {...getInputProps() }
          />
          <div
            className={classNames('Autocomplete-list', isOpen && filteredItems.length > 0 ? 'Autocomplete-list-active' : '')}
            role='listbox'
          >
            {filteredItems.map((item, index) =>
              <div
                className={classNames('Autocomplete-listItem', highlightedIndex === index ? 'Autocomplete-listItem-active' : '')}
                {...getItemProps({
                  key: item,
                  index,
                  item,
                }) }
              >
                {item}
              </div>,
            )}
          </div>
        </div>)
    }}
  </Downshift>
);

export default Autocomplete;
