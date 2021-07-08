import { useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem , CardSubtitle } from 'reactstrap'
import { useDispatch } from 'react-redux'
import './style.css'
import { handleRefValChanged } from '@store/actions/refMaker'
import { store } from '../../../../redux/storeConfig/store';
import PerfectScrollbar from 'react-perfect-scrollbar'


const SelectButton = (props) => {
    const dispatch = useDispatch()
 
    const [dropdownOpen, setOpen] = useState(false);
    const [bgColor, setBgColor] = useState("secondary");
    const [selectedItem, setSelectedItem] = useState(props.header);
    const [used, setUsed] = useState(false);

    const handleOptionSelected = (event) => {
        setBgColor('primary')
        setSelectedItem(event.target.innerHTML)
        setUsed(true)
        dispatch(handleRefValChanged({val:event.target.getAttribute('optionval').replace(' ','') , refPart : props.refPart}))
    } 

    const handleSubmit = () => {
        setSelectedItem(props.header)
    }

    store.subscribe( () => {
        const refMakerState = store.getState().refMaker;
        if( refMakerState[props.refPart] === false && used === true ) {
            handleSubmit()
            setBgColor('secondary')
        }
    });


    const toggle = (e) => {
        setOpen(!dropdownOpen);
        if (dropdownOpen !== true && e.target.id === 'new-ref-product') {
            setTimeout(() => {
                console.log(e.target);
                const dropDown = e.target.parentElement.querySelector('.dropdown-menu')
                dropDown.style.top = `${e.target.getBoundingClientRect().y + e.target.clientHeight}px`
                dropDown.style.height = '25vh'
                console.log(e.target.parentElement.querySelector('.dropdown-menu'));
            }, 1);
        }
        
        // e.target.querySelector('dropdown-menu').style.top = 1
    }
    
    return (
      <>
      <ButtonDropdown direction="down" isOpen={dropdownOpen} toggle={toggle} className="mt-2 col-12 col-md-4 pr-0" refpart={props.refPart}>
      <CardSubtitle tag="h6" className="mb-2 text-muted position-absolute" style={{top : -10 }}>{props.header}</CardSubtitle>
        <DropdownToggle caret color={bgColor} id={props.id} used={used ? 1 : 0} className={'my-select-button'}> 
            {selectedItem}  
        </DropdownToggle>
        <DropdownMenu>
        <PerfectScrollbar>
            { props?.options?.map(( option, i ) =>
                <DropdownItem key={i} className={'w-100'} onClick={handleOptionSelected} optionval={option._id ? option._id : option }>{option.name ? option.name : option}</DropdownItem>
            )}
        </PerfectScrollbar>

        </DropdownMenu>
        
      </ButtonDropdown>
      </>
    );
  }
  

export default SelectButton