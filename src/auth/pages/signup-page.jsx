import { useState } from 'react';
import { useAuth } from '@/auth/context/auth-context';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  AlertCircle,
  Check,
  Eye,
  EyeOff,
  LoaderCircleIcon,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { getSignupSchema } from '../forms/signup-schema';
import OtpVerificationModal from './OtpVerification';

export function SignUpPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [progress, setProgress] = useState(0);
  const form = useForm({
    resolver: zodResolver(getSignupSchema()),
    defaultValues: {
      email: '',
      password: '',
      npn: '',
      firstName: '',
      lastName: '',
      terms: false,
    },
  });

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    npn: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    // console.log("Data changed:", { ...data, [name]: value })
  };
  const handleSubmit = async () => {
    console.log('Form values:', data);
    try {
      setIsProcessing(true);
      setError(null);


      // if (!values.email.trim() || !values.password) {
      //   setError('Email and password are required');
      //   return;
      // }

      const apiUrl = import.meta.env.VITE_API_URL;
      // data.token = localStorage.getItem("authToken", "17|4kFMlcEYgIVlT6JlwddrLDUkVfeKwcZF6CPldcDf5ef2ea7b");

      const response = await fetch(`${apiUrl}/signup`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          firstName: data.firstName.trim(),
          lastName: data.lastName.trim(),
          email: data.email.trim().toLowerCase(),
          npn: data.npn.trim(),
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Login failed. Please try again.');
      }

      console.log('Signup successful:', result);

      localStorage.setItem('token', result.data.token);
      localStorage.setItem('user-data', JSON.stringify(result.data.user));
      // localStorage.setItem('user-info-prog', progress)

      // ✅ Navigate after login
      // const nextPath = '/recent-signups';
      // navigate(nextPath);
    }
    catch (err) {
      console.error('Unexpected sign-in error:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'An unexpected error occurred. Please try again.'
      );
    } finally {
      setIsProcessing(false);
    }
    // try {
    //   setIsProcessing(true);
    //   setError(null);

    //   // Register the user with Supabase
    //   await register(
    //     values.email,
    //     values.password,
    //     values.confirmPassword,
    //     values.firstName,
    //     values.lastName,
    //   );

    //   // Set success message and metadata
    //   setSuccessMessage(
    //     'Registration successful! Please check your email to confirm your account.',
    //   );

    //   // After successful registration, you might want to update the user profile
    //   // with additional metadata (firstName, lastName, etc.)

    //   // Optionally redirect to login page after a delay
    //   setTimeout(() => {
    //     navigate('/auth/signin');
    //   }, 3000);
    // } catch (err) {
    //   console.error('Registration error:', err);
    //   setError(
    //     err instanceof Error
    //       ? err.message
    //       : 'An unexpected error occurred during registration. Please try again.',
    //   );
    // } finally {
    //   setIsProcessing(false);
    // }
  }

  const [otp, setOtp] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleVerify = (otpCode) => {
    console.log("Entered OTP:", otpCode);
    // Send otpCode to backend here
    // setShowModal(false);
  };
  return (
    <Form {...form}>
      <form
        // onSubmit={form.handleSubmit(onSubmit)}
        onSubmit={handleSubmit}
        className="block w-full space-y-5"
      >
        <div className="text-center space-y-1 pb-3">
          <h1 className="text-2xl font-semibold tracking-tight">Sign Up</h1>
          <p className="text-sm text-muted-foreground">
            Create your account to get started
          </p>
        </div>

        {error && (
          <Alert
            variant="destructive"
            appearance="light"
            onClose={() => setError(null)}
          >
            <AlertIcon>
              <AlertCircle />
            </AlertIcon>
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}

        {successMessage && (
          <Alert appearance="light" onClose={() => setSuccessMessage(null)}>
            <AlertIcon>
              <Check />
            </AlertIcon>
            <AlertTitle>{successMessage}</AlertTitle>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  {...field} // <-- binds to react-hook-form
                  placeholder="Enter your first name"
                  onChange={(e) => {
                    field.onChange(e); // update RHF
                    handleChange(e);   // update your local state
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input
                  {...field} // <-- binds to react-hook-form
                  placeholder="Enter your first name"
                  onChange={(e) => {
                    field.onChange(e); // update RHF
                    handleChange(e);   // update your local state
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field} // <-- bind to RHF
                  placeholder="Your email address"
                  type="email"
                  onChange={(e) => {
                    field.onChange(e); // update RHF
                    handleChange(e);   // update local state
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <div className="relative">
                <Input
                  {...field} // <-- bind to RHF
                  placeholder="Create a password"
                  type={passwordVisible ? 'text' : 'password'}
                  onChange={(e) => {
                    field.onChange(e); // update RHF
                    handleChange(e);   // update local state
                  }}
                />

                <Button
                  type="button"
                  variant="ghost"
                  mode="icon"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                >
                  {passwordVisible ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="npn"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Npn</FormLabel>
              <FormControl>
                <Input
                  {...field} // <-- bind to RHF
                  placeholder="Enter your Npn number"
                  onChange={(e) => {
                    field.onChange(e); // update RHF
                    handleChange(e);   // update local state
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        {/* <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <div className="relative">
                <Input
                  placeholder="Confirm your password"
                  type={confirmPasswordVisible ? 'text' : 'password'}
                  {...field}
                />

                <Button
                  type="button"
                  variant="ghost"
                  mode="icon"
                  onClick={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                >
                  {confirmPasswordVisible ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-0.5 space-y-0 rounded-md">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm text-muted-foreground">
                  I agree to the and{' '}
                  <Link
                    to="#"
                    className="text-sm font-semibold text-foreground hover:text-primary"
                  >
                    Privacy Policy
                  </Link>
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button type="button" onClick={() => {handleShow(); handleSubmit();}} className="w-full" disabled={isProcessing}>
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <LoaderCircleIcon className="h-4 w-4 animate-spin" /> Creating
              account...
            </span>
          ) : (
            'Create Account'
          )}
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link
            to="/auth/signin"
            className="text-sm font-semibold text-foreground hover:text-primary"
          >
            Sign In
          </Link>
        </div>

        <OtpVerificationModal
          show={show}
          handleClose={handleClose}
          handleVerify={handleVerify}
          email={data.email}
        />
      </form>
    </Form>
  );
}
