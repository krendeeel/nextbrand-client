import { Step, StepLabel, Stepper } from '@material-ui/core';
import React from 'react'

interface CheckoutWizardProps {
    activeStep: number
}

const CheckoutWizard: React.FC<CheckoutWizardProps> = ({ activeStep = 0 }) => {
    return (
        <Stepper style={{ background: 'transparent' }} activeStep={activeStep} alternativeLabel>
            {
                ['Регистрация', 'Адресс доставки', 'Метод оплаты', 'Оплата'].map(step =>
                (
                    <Step key={step}>
                        <StepLabel>{step}</StepLabel>
                    </Step>
                ))
            }
        </Stepper>
    )
}

export default CheckoutWizard;
