import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import { UserPlus } from 'lucide-react';
import { AxiosError } from 'axios';

export default function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');

  const mutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      login(data.token, data.user);
      navigate('/dashboard');
    },
    onError: (err: unknown) => {
      if (err instanceof AxiosError) {
        setServerError(err.response?.data?.message || 'Registration failed');
      } else {
        setServerError('Registration failed');
      }
    }
  });

  const onSubmit = (data: Record<string, string>) => {
    setServerError('');
    mutation.mutate(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <div>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <UserPlus className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create an account
          </h2>
        </div>
        
        {serverError && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm text-center">
            {serverError}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
              />
              {errors.name?.message && <p className="mt-1 text-sm text-red-600">{errors.name.message as string}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email address</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
              />
              {errors.email?.message && <p className="mt-1 text-sm text-red-600">{errors.email.message as string}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                {...register("password", { required: "Password is required", minLength: { value: 6, message: "Minimum 6 characters" } })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
              />
              {errors.password?.message && <p className="mt-1 text-sm text-red-600">{errors.password.message as string}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <select
                {...register("role")}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
            >
              {mutation.isPending ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
        <div className="text-center text-sm">
          <Link to="/login" className="font-medium text-green-600 hover:text-green-500">
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
