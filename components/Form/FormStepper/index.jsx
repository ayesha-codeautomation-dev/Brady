import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import React, { Children, cloneElement, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import FormStep from './FormStep';
import * as styles from './styles.module.scss';
import Button from '../../Common/Button';
import FieldButton from '../../Fields/FieldButton';

const FormStepper = props => {
  const {
    children,
    showHeading = true,
    onSubmit,
    defaultValues,
    nextStepText = 'Continue',
    previousStepText = 'Back to previous step',
    validationSchema,
    // hasCartItem = false,
    closeModal,
    warning,
    clearCart,
    requiresEquipmentSize,
    onClickCheckout
  } = props;
  const filteredChildren = Children.toArray(children);
  const childrenCount = filteredChildren?.length;
  const [activeStep, setActiveStep] = useState(0);
  const [lastStep, setLastStep] = useState('');
  const progress = ((activeStep + 1) / childrenCount) * 100;
  const currentStepProps = filteredChildren?.[activeStep]?.props;
  const currentStepTitle = currentStepProps?.title;
  const currentStepHideNext = currentStepProps?.hideNext;
  const currentIsLastStep = activeStep === childrenCount - 1;

  const [validateMode, setValidateMode] = useState('onSubmit');

  const methods = useForm({
    defaultValues: defaultValues || {},
    resolver: yupResolver(validationSchema(activeStep, requiresEquipmentSize)),
    validateMode,
    reValidateMode: 'onChange'
  });

  const onSubmitHandler = formValues => {
    if (onSubmit) onSubmit(formValues, methods);
  };

  const nextStep = async () => {
    const isValid = await methods.trigger(); // Manually trigger validation
    if (!isValid) {
      setValidateMode('onChange');
      methods.getValues();
    }
    if (isValid && activeStep < childrenCount - 1) {
      setActiveStep(activeStep + 1);
      setValidateMode('onSubmit');
      setLastStep('next');
    }
  };

  const previousStep = () => {
    setLastStep('previous');
    if (activeStep > 0) setActiveStep(activeStep - 1);
  };

  const goToStep = step => {
    if (step >= 0 && step < childrenCount) setActiveStep(step);
  };

  const childrenWithProps = filteredChildren.map((child, index) => {
    const isCurrentStep = index === activeStep;
    const isLastStep = index === childrenCount - 1;
    const isFirstStep = index === 0;
    const isPrevious = index < activeStep;
    const isNext = index > activeStep;

    if (!child && isCurrentStep && (lastStep === 'next' || !lastStep) && !isLastStep) {
      return setActiveStep(activeStep + 1);
    }

    if (!child && isCurrentStep && lastStep === 'previous' && !isFirstStep) {
      return setActiveStep(activeStep - 1);
    }

    const filteredChildProps = child?.props?.children?.filter(item => !!item);

    const clonedChild = {
      ...child,
      props: { ...child?.props, children: filteredChildProps }
    };

    return cloneElement(clonedChild, {
      ...clonedChild.props,
      isCurrentStep,
      isPrevious,
      isNext,
      isLastStep,
      isFirstStep,
      nextStep,
      previousStep,
      goToStep,
      methods
    });
  });

  const groupBookingToggle = process.env.GATSBY_GROUP_BOOKINGS === 'true';

  return (
    <FormProvider {...methods} nextStep={nextStep} previousStep={previousStep} goToStep={goToStep}>
      <form
        onSubmit={methods.handleSubmit(onSubmitHandler)}
        className={classNames(styles.steps, warning && styles.warningSteps)}
      >
        {showHeading && (
          <div className={classNames(styles.heading, warning && styles.warning)}>
            <div className={styles.title}>{currentStepTitle}</div>
          </div>
        )}
        <button type="button" className={styles.closeButton} onClick={() => closeModal()}>
          <span />
          <span />
        </button>
        {childrenCount > 1 && (
          <div className={styles.progress}>
            <div className={styles.progressInner} style={{ width: `${progress}%` }} />
          </div>
        )}
        <div className={styles.content}>
          <div className={styles.wrapper}>{childrenWithProps}</div>
        </div>
        <div className={styles.footer}>
          {!currentStepHideNext && groupBookingToggle && (
            <Button className={styles.next} onClick={nextStep}>
              {nextStepText}
            </Button>
          )}
          {!groupBookingToggle && !currentIsLastStep && !warning && (
            <Button className={styles.next} onClick={nextStep}>
              {nextStepText}
            </Button>
          )}
          {!groupBookingToggle && currentIsLastStep && !warning && (
            <FieldButton className={styles.next} onClick={onClickCheckout} text="Checkout now" />
          )}
          <div className={styles.separator} />
          {activeStep > 0 && (
            <Button className={styles.previous} onClick={previousStep} disabled={activeStep === 0}>
              {previousStepText}
            </Button>
          )}
          {warning && (
            <Button className={styles.previous} onClick={() => clearCart()}>
              Start a new booking
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

FormStepper.Step = FormStep;

export default FormStepper;
