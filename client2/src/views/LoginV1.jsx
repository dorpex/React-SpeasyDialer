import { Link } from 'react-router-dom'
import { Facebook, Twitter, Mail, GitHub , Coffee } from 'react-feather'
import InputPasswordToggle from '@components/input-password-toggle'
import { Card, CardBody, CardTitle, CardText, Form, FormGroup, Label, Input, CustomInput, Button } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import { useRTL } from '@hooks/useRTL'
import { Fragment , useContext , useState} from 'react'
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { handleLogin } from '@store/actions/auth'
import { AbilityContext } from '../utility/context/Can'
import { useForm } from 'react-hook-form'
import useJwt from '@src/auth/jwt/useJwt'
import { toast , Slide } from 'react-toastify'
import Avatar from '@components/avatar'
import { getHomeRouteForLoggedInUser , isObjEmpty } from '@utils'
import Alert from 'reactstrap/lib/Alert'
import { useRouterTransition } from '@hooks/useRouterTransition'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)


const LoginV1 = () => {
 

  const ability = useContext(AbilityContext)
  const dispatch = useDispatch()
  const history = useHistory()

  const [isRtl, setIsRtl] = useRTL()
  const { register, errors, handleSubmit } = useForm()
  const [transition, setTransition] = useRouterTransition()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // if (isUserLoggedIn()) {
  //   console.log(isUserLoggedIn());
  // }
  const ToastContent = ({ name, role }) => (
    <Fragment>
      <div className='toastify-header'>
        <div className='title-wrapper'>
          <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
          <h6 className='toast-title font-weight-bold'>ברוך הבא, {name}</h6>
        </div>
      </div>
      <div className='toastify-body'>
        <span>התחברתה בתור - {role}</span>
      </div>
    </Fragment>
  )

  const onSubmit = data => {
    if (isObjEmpty(errors)) {
      useJwt
        .login(data)
        .then(res => {
          if (res.data.userData === undefined) {
            MySwal.fire({
              title: <p>טעות בפרטים</p>,
              footer: 'במידה ואינך יודע את הפרטים יש לפנות לאורי',
              confirmButtonText : 'אישור'
            })
            return
          }
          console.log(res.data.userData);
          const data = { ...res.data.userData, accessToken: res.data.accessToken, refreshToken: res.data.refreshToken }
          dispatch(handleLogin(res.data.userData))
          ability.update('נציג')
          history.push(getHomeRouteForLoggedInUser('נציג'))
          toast.success(
            <ToastContent name={ data.name } role={'נציג'} />,
            { transition: Slide, hideProgressBar: true, autoClose: 5000 }
          )
        })
        .catch(err => console.log(err))
    }
  }

  return (
    <div className='auth-wrapper auth-v1 px-2'>
      <div className='auth-inner py-2'>
        <Card className='mb-0'>
          <CardBody>
            <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
              <svg viewBox='0 0 139 95' version='1.1' height='28'>
                <defs>
                  <linearGradient x1='100%' y1='10.5120544%' x2='50%' y2='89.4879456%' id='linearGradient-1'>
                    <stop stopColor='#000000' offset='0%'></stop>
                    <stop stopColor='#FFFFFF' offset='100%'></stop>
                  </linearGradient>
                  <linearGradient x1='64.0437835%' y1='46.3276743%' x2='37.373316%' y2='100%' id='linearGradient-2'>
                    <stop stopColor='#EEEEEE' stopOpacity='0' offset='0%'></stop>
                    <stop stopColor='#FFFFFF' offset='100%'></stop>
                  </linearGradient>
                </defs>
                <g id='Page-1' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                  <g id='Artboard' transform='translate(-400.000000, -178.000000)'>
                    <g id='Group' transform='translate(400.000000, 178.000000)'>
                      <path
                        d='M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z'
                        id='Path'
                        className='text-primary'
                        style={{ fill: 'currentColor' }}
                      ></path>
                      <path
                        d='M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z'
                        id='Path'
                        fill='url(#linearGradient-1)'
                        opacity='0.2'
                      ></path>
                      <polygon
                        id='Path-2'
                        fill='#000000'
                        opacity='0.049999997'
                        points='69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325'
                      ></polygon>
                      <polygon
                        id='Path-2'
                        fill='#000000'
                        opacity='0.099999994'
                        points='69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338'
                      ></polygon>
                      <polygon
                        id='Path-3'
                        fill='url(#linearGradient-2)'
                        opacity='0.099999994'
                        points='101.428699 0 83.0667527 94.1480575 130.378721 47.0740288'
                      ></polygon>
                    </g>
                  </g>
                </g>
              </svg>
              <h2 className='brand-text text-primary ml-1'>SpeasyDialer</h2>
            </Link>
            <CardTitle tag='h4' className='mb-1'>
              ברוכים הבאים ל - SpeasyDialer 👋
            </CardTitle>
            {/* <CardText className='mb-2'>Please sign-in to your account and start the adventure</CardText> */}
            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              
              <FormGroup>
                <Label className='form-label' for='login-email'>
                  אימייל
                </Label>
                <Input 
                autoFocus
                type='email'
                value={email}
                id='email'
                name='email'
                placeholder='נא לבחור אימייל'
                onChange={e => setEmail(e.target.value)}
                innerRef={register({ required: true, validate: value => value !== '' })}
                hebrewname ="אימייל"
                />
              </FormGroup>

              <FormGroup>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    סיסמא
                  </Label>
                  <Link to='/pages/forgot-password-v1'>
                    <small>Forgot Password?</small>
                  </Link>
                </div>
                <InputPasswordToggle
                type='password'
                value={password}
                id='password'
                name='password'
                placeholder='נא לבחור סיסמא'
                onChange={e => setPassword(e.target.value)}
                innerRef={register({ required: true, validate: value => value !== '' })}
                hebrewname ="סיסמא"
                className='input-group-merge'
                />
              </FormGroup>

              {/* <FormGroup>
                <CustomInput type='checkbox' className='custom-control-Primary' id='remember-me' label='Remember Me' />
              </FormGroup> */}
              <Button.Ripple color='primary' block type="submit">
                התחבר
              </Button.Ripple>
            </Form>
            <p className='text-center mt-2'>
              <span className='mr-25'>חדש בתוכנה?</span>
              <Link to='/register'>
                <span>צור משתמש</span>
              </Link>
            </p>
          
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default LoginV1
