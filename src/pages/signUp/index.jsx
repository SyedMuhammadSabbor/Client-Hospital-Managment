import React, { useState } from 'react';
import FormInput from '../../Components/formInput';
import Button from '../../Components/button';
const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData;


  const onSubmit = (e) => {
    e.preventDefault();
    setFormData(formData)
    console.log('details:' , formData )
    // handle form submission
  };

  return (
    <main className="min-h-screen  flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 px-8 py-10 "  >
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-textColor">
            Sign up
          </h2>
        </div>
        <form className="mt-8 space-y-6 w-full" onSubmit={onSubmit}>
          <div className="rounded-md shadow-sm flex flex-col w-full">
            <label>
            <p className="text-sm text-textColor mb-2">Name</p>
              <FormInput
                id="name"
                name="name"
                type="text"
                required
                placeholder="Name"
                value={name}
                handleChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
              />
            </label>
            <label>
            <p className="text-sm text-textColor mb-2">Email</p>
              <FormInput
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Email address"
                value={email}
                handleChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }              />
            </label>
            <label>
            <p className="text-sm text-textColor mb-2">Password</p>

              <FormInput
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Password"
                value={password}
                handleChange={(e) =>
                    setFormData((prev) => ({ ...prev, password: e.target.value }))
                  }              />
            </label>
          </div>

          <div>
            <Button
              type="submit"
              text= 'Sign up'
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            />
          </div>
        </form>
      </div>
    </main>
  );
};

export default Signup;