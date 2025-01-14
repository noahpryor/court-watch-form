import { createStyles, Theme, withStyles, WithStyles } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Case from './Case';
import Charge from './Charge';
import Accused from './Accused';
import Bail from './Bail';
import Plea from './Plea';
import React, {useState} from 'react';

type ThemeProps = Theme & {
    spacing: number 
}

const styles = (theme: Theme) => createStyles({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginTop: 150,
    marginLeft: theme.spacing() * 2, //spacing.unit
    marginRight: theme.spacing() * 2, //spacing.unit
    [theme.breakpoints.up(600 + theme.spacing() * 2 * 2)]: { //spacing.unit
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing() * 3, //spacing.unit
    marginBottom: theme.spacing() * 3, //spacing.unit
    padding: theme.spacing() * 2, //spacing.unit
    [theme.breakpoints.up(600 + theme.spacing() * 3 * 2)]: { //spacing.unit
      marginTop: theme.spacing() * 6, //spacing.unit
      marginBottom: theme.spacing() * 6, //spacing.unit
      padding: theme.spacing() * 3, //spacing.unit
    },
  },
  stepper: {
    padding: `${theme.spacing() * 3}px 0 ${theme.spacing() * 5}px`, //spacing.unit
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing() * 3, //spacing.unit
    marginLeft: theme.spacing(), //spacing.unit
  },
});

const steps = ['Case', 'Charge', 'Defendent', 'Plea', 'Bail'];

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <Case />;
    case 1:
      return <Charge />;
    case 2:
      return <Accused />;
    case 3:
      return <Plea />;
    case 4:
      return <Bail />;
    default:
      throw new Error('Unknown step');
  }
}

interface State {
    activeStep: number
}

interface Props {
    classes: any
}

const DisplayForm: React.FC<Props & WithStyles<'root'>> = (props: any) => {
    const [activeStep, setActiveStep] = useState<number>(0)
    const handleNext = () => {
        let newStep = activeStep + 1
        setActiveStep(newStep)
      };
    
    const handleBack = () => {
        let newStep = activeStep - 1
        setActiveStep(newStep)
      };
    
    const handleReset = () => {
        setActiveStep(0)
      };
      const { classes } = props;
      return (
        <React.Fragment>
          <CssBaseline />
          <main className={classes.layout}>
            <Paper className={classes.paper}>
              <Typography component="h1" variant="h4" align="center">
                Accountabilty Form
              </Typography>
              <Stepper activeStep={activeStep} className={classes.stepper}>
                {steps.map(label => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <React.Fragment>
                {activeStep === steps.length ? (
                    //replace with Component for all case files
                  <React.Fragment>
                    <Typography variant="h5" gutterBottom>
                      Thank you for your order.
                    </Typography>
                    <Typography variant="subtitle1">
                      Your order number is #2001539. We have emailed your order confirmation, and will
                      send you an update when your order has shipped.
                    </Typography>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {getStepContent(activeStep)}
                    <div className={classes.buttons}>
                      {activeStep !== 0 && (
                        <Button onClick={handleBack} className={classes.button}>
                          Back
                        </Button>
                      )}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                      </Button>
                    </div>
                  </React.Fragment>
                )}
              </React.Fragment>
            </Paper>
          </main>
        </React.Fragment>
      );
    }


// DisplayForm.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export const MainDisplayForm = withStyles(styles)(DisplayForm);