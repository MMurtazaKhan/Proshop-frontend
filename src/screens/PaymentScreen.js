import React, {useState} from 'react'
import {Form, Col, Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import {useSelector, useDispatch} from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import {savePaymentMethod} from '../actions/cartActions'

function PaymentScreen() {

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const navigate = useNavigate()
    const dispatch = useDispatch()

    if(!shippingAddress.address){
        navigate('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('paypal')

    const submitHandler = (e)  => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3 />

        <Form onSubmit={submitHandler} >
        <Form.Group controlId='address'>
            <Form.Label as='legend' >Select Method</Form.Label>
            <Col>
                <Form.Check
                    type='radio'
                    label='PayPal or Credit Card'
                    id='paypal'
                    name='paymentMethod'
                    checked
                    onChange={e => setPaymentMethod(e.target.value)}
                >

                </Form.Check>
            </Col>
        </Form.Group>

        <Button type='submit' variant='primary '>
            Continue
        </Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen