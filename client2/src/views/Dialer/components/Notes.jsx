import { CardBody } from "reactstrap"
import {  useEffect, useState } from "react"
import { useSelector } from "react-redux"
import FormGroup from "reactstrap/lib/FormGroup"
import Label from "reactstrap/lib/Label"
import Input from "reactstrap/lib/Input"

const Note = ({ props}) => {
    return (
        <CardBody>
            <div className="w-100">
                <div className="d-flex flex-column font-weight-bolder shadow-lg p-1">
                    <u className="col-12 p-0 underline">{props.agentName}</u>
                    {props.text}
                </div>
            </div>
        </CardBody>
    )
}

const EmptyNote = ({}) => {
    const agentName = useSelector((state) => state.auth.userData.name)
    return (
        <CardBody>
            <div className="w-100">
                <div className="d-flex flex-column font-weight-bolder shadow-lg p-1">
                    
                    <FormGroup>
                        <Label for="exampleText"><h5><u className="col-12 p-0 underline font-weight-bolder">{agentName} -  הערה חדשה </u></h5></Label>
                        <Input type="textarea" name="text" id="exampleText" />
                    </FormGroup>
                </div>
            </div>
        </CardBody>
    )
}

export const Notes = () => {
    const notesData = useSelector((state) => state.lead.notes)
    return (
        <>
            <span>הערות לליד</span>
                {notesData.map((note , i) => {
                    return <Note key={i} props={note}/>
                })}
            {<EmptyNote/>}
        </>
    )
}