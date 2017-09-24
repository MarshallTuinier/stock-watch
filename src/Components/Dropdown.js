import React from 'react';
import styled from 'styled-components';

const Dropdown = props => {
  const { activeItem, dropdownOpen, handleSelect, handleDropdown } = props;
  return (
    <DropdownContainer>
      <div style={{ paddingTop: '1px' }}>
        <DropdownItem
          className={dropdownOpen ? 'dropdown-open' : 'dropdown-closed'}
          value={'last 30 days'}
          onClick={() => handleSelect('last 30 days')}
          activeItem={activeItem}
        >
          last 30 days
        </DropdownItem>
        <DropdownItem
          className={dropdownOpen ? 'dropdown-open' : 'dropdown-closed'}
          value={'last 60 days'}
          onClick={() => handleSelect('last 60 days')}
          activeItem={activeItem}
        >
          last 60 days
        </DropdownItem>
        <DropdownItem
          className={dropdownOpen ? 'dropdown-open' : 'dropdown-closed'}
          value={'last 90 days'}
          onClick={() => handleSelect('last 90 days')}
          activeItem={activeItem}
        >
          last 90 days
        </DropdownItem>
        <DropdownItem
          className={dropdownOpen ? 'dropdown-open' : 'dropdown-closed'}
          value={'last 6 months'}
          onClick={() => handleSelect('last 6 months')}
          activeItem={activeItem}
        >
          last 6 months
        </DropdownItem>
        <DropdownItem
          className={dropdownOpen ? 'dropdown-open' : 'dropdown-closed'}
          value={'last year'}
          onClick={() => handleSelect('last year')}
          activeItem={activeItem}
        >
          last year
        </DropdownItem>
        <DropdownItem
          className={dropdownOpen ? 'dropdown-open' : 'dropdown-closed'}
          value={'last 5 years'}
          onClick={() => handleSelect('last 5 years')}
          activeItem={activeItem}
        >
          last 5 years
        </DropdownItem>
        <DropdownItem
          className={dropdownOpen ? 'dropdown-open' : 'dropdown-closed'}
          value={'last 10 years'}
          onClick={() => handleSelect('last 10 years')}
          activeItem={activeItem}
        >
          last 10 years
        </DropdownItem>
      </div>
      <Arrow onClick={handleDropdown} dropdownOpen={dropdownOpen} />
    </DropdownContainer>
  );
};

const DropdownContainer = styled.div`
  display: flex;
  position: absolute;
  z-index: 2;
  .column {
    flex-direction: column;
  }
  .dropdown-closed {
    display: none;
  }
  .dropdown-open {
    display: block;
  }
`;

const Arrow = styled.div`
  border: solid #abb9d6;
  width: 1.5px;
  height: 1.5px;
  border-width: 0 1.5px 1.5px 0;
  display: inline-block;
  margin-top: 2px;
  padding: 3px;
  transition: all 0.2s;
  transform: ${props =>
    props.dropdownOpen ? 'translateY(6px) rotate(-135deg)' : 'rotate(45deg)'};
  &:hover {
    border: solid #00f1a1;
    border-width: 0 1.5px 1.5px 0;
    cursor: pointer;
  }
`;

const DropdownItem = styled.div`
  padding-bottom: 5px;
  width: 90px;
  background-color: #27273f;
  color: #6086d6;
  font-size: 14px;
  display: ${props =>
    props.value === props.activeItem ? 'block' : ''} !important;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    color: #00f1a1;
  }
`;

export default Dropdown;
