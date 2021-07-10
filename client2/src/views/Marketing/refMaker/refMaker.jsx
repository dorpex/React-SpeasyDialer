import { 
    Card, CardText, CardBody, CardTitle, Button,
    Form, FormGroup, Label, Input, FormText,
    CardSubtitle , Alert
    
} from 'reactstrap';
import SelectButton from './components/selectButton.jsx';
import { PlusCircle , Coffee } from 'react-feather'
import { useEffect, useState } from 'react';
import { useDispatch , useSelector } from 'react-redux'
import { handleRefValChanged } from '@store/actions/refMaker'
import Swal from 'sweetalert2';
import { toast } from 'react-toastify'
import Avatar from '@components/avatar'
import './components/style.css'
import moment from 'moment'
import { domain } from '../../../utility/Utils'


const refMaker = () => {
    const refMakerState = useSelector((state) => state.refMaker)
    const buttonState = refMakerState.button
    delete refMakerState.button
    const dispatch = useDispatch()
    const [newRef, setNewRef] = useState('');
    const [users, setUsers] = useState([]);
    const [products, setProducts ] = useState([]);

    useEffect(() => {
        const firstRun = async () => {
            const dbData = await  fetch(`http://${domain}/marketing/refmaker/get-data` , {
                method : 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            setUsers(dbData.users)
            setProducts(dbData.products)
        }
        firstRun()
    }, [])
    console.log();
    console.log(products);
    const handleSubmitNewRef = () => {
        if (buttonState) {
            let newRefText = new String()
            for (const key in refMakerState) {
                newRefText = refMakerState[key] !== 'undefined' ? `${newRefText}$_${String(refMakerState[key])}` : newRefText
                dispatch(handleRefValChanged({val:false , refPart : key}))
            }
            document.getElementById('new-ref-landing-page').value = ''
            document.getElementById('new-ref-ad-name').value = ''
            setNewRef(`${newRefText}$_${moment().valueOf()}`)
            navigator.clipboard.writeText(newRefText)
            toast.info('הרף נוצר בהצלחה 🥳', {
                position: "top-center",
                style: {
                    backgroundColor : 'green',
                    fontWeight : 'bolder',
                },
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });

        }else{
            Swal.fire('נא למלא את כל הפרטים')
            .then(e => {
                for (const key in refMakerState) {
                    if (refMakerState[key] === false) {
                        document.querySelector(`[refPart="${key}"] > button`).click()
                        break
                    }
                }
            })
        }
    }

    const handleInputChange = (e) => {
        console.log( e.target.getAttribute('refPart'));
        dispatch(handleRefValChanged({val:e.target.value.length > 0 ? e.target.value : false , refPart : e.target.getAttribute('refPart')}))
    }
    
    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">רף חדש</CardTitle>
                        <div className={"w-100 mb-2"}>
                            <SelectButton 
                                header={"שם המשווק" }
                                options={users}
                                id="new-ref-affiliate"
                                refPart='affiliate'
                            />
                            <SelectButton 
                                header="מוצר" 
                                options={products}
                                id="new-ref-product"
                                refPart='product'
                            />
                            <SelectButton 
                                header="פלטפורמה" 
                                options={[ 'Facebook' , 'Google Media' , 'Google Search', 'Instagram' , 'Tabula' , 'Outbrain' ]}
                                id="new-ref-platform"
                                refPart='platform'
                            />
                            <SelectButton 
                                header="קהל" 
                                options={[ 'קר' , 'רי מרקטינג' , 'לוק אלייק' ]}
                                id="new-ref-audiance"
                                refPart='audiance'
                            />
                            <div className="mt-2 pr-0  col-12 col-md-4" style={{display:'inline-flex' , verticalAlign : 'middle'}}>
                                <CardSubtitle tag="h6" className="mb-2 text-muted position-absolute" style={{top : -10 }}>{'דף נחיתה'}</CardSubtitle>
                                <Input id="new-ref-landing-page" placeholder="דף נחיתה" onInput={handleInputChange} refpart='landingPage'/>
                            </div>
                            <div className="mt-2 pr-0  col-12 col-md-4" style={{display:'inline-flex' , verticalAlign : 'middle'}}>
                                <CardSubtitle tag="h6" className="mb-2 text-muted position-absolute" style={{top : -10 }}>{'שם המודעה'}</CardSubtitle>
                                <Input id="new-ref-ad-name" placeholder="שם המודעה" className={'w-100 '} refpart='adName' onInput={handleInputChange}/>
                            </div>
                            <div className={newRef !== '' ? "col-12 mt-2 shadow-lg p-1 bg-white rounded" : ''}>
                                {newRef !== '' ? <CardSubtitle tag="h6" className="mb-2  position-absolute" style={{top : -10 }}>{'הרף החדש'}</CardSubtitle> : ''}

                                {newRef}
                            </div>
                        </div>
                    <Button color={buttonState ? 'primary' : 'secondary' } onClick={handleSubmitNewRef} className={"ml-1"}>צור רף <PlusCircle/></Button>
                </CardBody>
            </Card>
        </div>
    )
}

export default refMaker
