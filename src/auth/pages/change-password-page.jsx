// import { useEffect, useState } from 'react';
// import { zodResolver } from '@hookform/resolvers/zod';
// import {
//   AlertCircle,
//   Check,
//   Eye,
//   EyeOff,
//   LoaderCircleIcon,
// } from 'lucide-react';
// import { useForm } from 'react-hook-form';
// import { Link, useNavigate, useSearchParams } from 'react-router-dom';
// import { supabase } from '@/lib/supabase';
// import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
// import { Button } from '@/components/ui/button';
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import { getNewPasswordSchema } from '../../auth/forms/reset-password-schema';

// export function ChangePasswordPage () {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState(null);
//   const [tokenValid, setTokenValid] = useState(false);

//   // Check for different possible token parameter names used by Supabase
//   // Supabase might use 'token', 'code', 'token_hash' or pass it as a URL hash
//   const token =
//     searchParams.get('token') ||
//     searchParams.get('code') ||
//     searchParams.get('token_hash');

//   console.log('Reset token from URL:', token);
//   console.log(
//     'All search parameters:',
//     Object.fromEntries(searchParams.entries()),
//   );

//   // Process Supabase recovery token
//   useEffect(() => {
//     // This automatically processes the token in the URL
//     const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
//       if (event === 'PASSWORD_RECOVERY') {
//         // Token is valid and has been processed by Supabase
//         console.log('Password recovery mode activated');
//         setTokenValid(true);
//         setSuccessMessage('You can now set your new password');
//       }
//     });

//     return () => {
//       authListener.subscription.unsubscribe();
//     };
//   }, []);

//   // Also check for hash fragment which might contain the token
//   useEffect(() => {
//     const hashParams = new URLSearchParams(window.location.hash.substring(1));
//     const hashToken =
//       hashParams.get('token') ||
//       hashParams.get('code') ||
//       hashParams.get('token_hash');

//     if (hashToken && !token) {
//       console.log('Found token in URL hash fragment:', hashToken);
//       // Optionally, you could update the state or reload the page with the token as a query param
//     }
//   }, [token]);

//   const form = useForm({
//     resolver: zodResolver(getNewPasswordSchema()),
//     defaultValues: {
//       password: '',
//       confirmPassword: '',
//     },
//   });

//   async function onSubmit(values) {
//     try {
//       setIsProcessing(true);
//       setError(null);

//       // Use Supabase's updateUser method directly
//       // The token is already processed by the onAuthStateChange handler
//       const { error } = await supabase.auth.updateUser({
//         password: values.password,
//       });

//       if (error) {
//         throw new Error(error.message);
//       }

//       // Set success message
//       setSuccessMessage('Password changed successfully!');

//       // Reset form
//       form.reset();

//       // Redirect to login page after a successful password reset
//       setTimeout(() => {
//         navigate('/auth/signin');
//       }, 2000);
//     } catch (err) {
//       console.error('Password reset error:', err);
//       setError(
//         err instanceof Error
//           ? err.message
//           : 'An unexpected error occurred. Please try again.',
//       );
//     } finally {
//       setIsProcessing(false);
//     }
//   }

//   if (!token && !tokenValid) {
//     return (
//       <div className="max-w-md mx-auto space-y-5">
//         <div className="text-center space-y-2">
//           <h1 className="text-2xl font-bold tracking-tight">Reset Password</h1>
//           <p className="text-sm text-muted-foreground">
//             You need a valid reset link to change your password
//           </p>
//         </div>

//         <div className="bg-muted/50 p-4 rounded-lg border border-border">
//           <h3 className="font-medium mb-2">How to reset your password:</h3>
//           <ol className="list-decimal ms-4 text-sm space-y-1 text-muted-foreground">
//             <li>Request a password reset link via email</li>
//             <li>Check your email inbox and spam folder</li>
//             <li>Click the reset link in the email you receive</li>
//             <li>Create a new password on the page that opens</li>
//           </ol>
//         </div>

//         <Button asChild className="w-full">
//           <Link to="/auth/request-reset">Request a Reset Link</Link>
//         </Button>

//         <div className="text-center text-sm">
//           <span className="text-muted-foreground">Remember your password?</span>{' '}
//           <Link to="/auth/signin" className="text-primary hover:underline">
//             Sign In
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-md mx-auto">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//           <div className="text-center space-y-2">
//             <h1 className="text-2xl font-bold tracking-tight">
//               Set New Password
//             </h1>
//             <p className="text-muted-foreground">
//               Create a strong password for your account
//             </p>
//           </div>

//           {error && (
//             <Alert variant="destructive">
//               <AlertIcon>
//                 <AlertCircle className="h-4 w-4" />
//               </AlertIcon>
//               <AlertTitle>{error}</AlertTitle>
//             </Alert>
//           )}

//           {successMessage && (
//             <Alert>
//               <AlertIcon>
//                 <Check className="h-4 w-4 text-green-500" />
//               </AlertIcon>
//               <AlertTitle>{successMessage}</AlertTitle>
//             </Alert>
//           )}

//           <div className="space-y-4">
//             <FormField
//               control={form.control}
//               name="password"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>New Password</FormLabel>
//                   <div className="relative">
//                     <Input
//                       placeholder="Create a strong password"
//                       type={passwordVisible ? 'text' : 'password'}
//                       autoComplete="new-password"
//                       {...field}
//                     />

//                     <Button
//                       type="button"
//                       variant="ghost"
//                       mode="icon"
//                       onClick={() => setPasswordVisible(!passwordVisible)}
//                       className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
//                     >
//                       {passwordVisible ? (
//                         <EyeOff className="h-4 w-4" />
//                       ) : (
//                         <Eye className="h-4 w-4" />
//                       )}
//                     </Button>
//                   </div>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="confirmPassword"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Confirm Password</FormLabel>
//                   <div className="relative">
//                     <Input
//                       placeholder="Verify your password"
//                       type={confirmPasswordVisible ? 'text' : 'password'}
//                       autoComplete="new-password"
//                       {...field}
//                     />

//                     <Button
//                       type="button"
//                       variant="ghost"
//                       mode="icon"
//                       onClick={() =>
//                         setConfirmPasswordVisible(!confirmPasswordVisible)
//                       }
//                       className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
//                     >
//                       {confirmPasswordVisible ? (
//                         <EyeOff className="h-4 w-4" />
//                       ) : (
//                         <Eye className="h-4 w-4" />
//                       )}
//                     </Button>
//                   </div>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           <Button type="submit" className="w-full" disabled={isProcessing}>
//             {isProcessing ? (
//               <span className="flex items-center gap-2">
//                 <LoaderCircleIcon className="h-4 w-4" /> Updating Password...
//               </span>
//             ) : (
//               'Reset Password'
//             )}
//           </Button>

//           <div className="text-center text-sm">
//             <Link to="/auth/signin" className="text-primary hover:underline">
//               Back to Sign In
//             </Link>
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// }


// src/pages/CreateNewPass.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function ChangePasswordPage () {
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (password !== confirmPass) {
      setMessage("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("resetToken");
      const email = localStorage.getItem("resetEmail");

      if (!token || !email) {
        setMessage("Reset session expired. Please request again.");
        return;
      }

      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          token,
          password,
          password_confirmation: confirmPass,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Something went wrong");
        return;
      }

      setMessage("Password reset successfully!");
      localStorage.removeItem("resetToken");
      localStorage.removeItem("resetEmail");
      navigate("/public-profile/profiles/default"); // redirect after success
    } catch (err) {
      setMessage("An unexpected error occurred.");
      console.error("An unexpected err", err);
    } finally {
      setLoading(false);
    }
  };

  return (
 <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
          Create New Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          {/* Error Message */}
          {message && (
            <div className="text-red-600 text-sm bg-red-100 px-3 py-2 rounded-md">
              {message}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-red-600 text-white font-semibold shadow-md hover:bg-red-700 transition disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

// export default CreateNewPass;
