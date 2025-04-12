import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/authInput';
import { DarkModeToggle } from '../components/DarkModeToggle';

export default function Login({ toggleTheme, theme }) {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(credentials);
            navigate('/');
        } catch (err) {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center h-full transition-colors duration-300 ">
            <div className='absolute  h-16  right-3 flex items-center'>
                <label htmlFor="themeToggle" className="relative inline-block w-12 h-6 cursor-pointer">
                    <input
                        type="checkbox"
                        id="themeToggle"
                        className="sr-only"
                        onChange={toggleTheme}
                        checked={theme === "dark"}
                    />
                    <div className="block bg-gray-300 dark:bg-gray-600 w-12 h-6 rounded-full transition-colors duration-300"></div>
                    <span
                        className={`absolute left-1 top-1 dark:bg-white bg-black w-4 h-4 rounded-full transition-transform duration-300 ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
                            }`}
                    ></span>
                </label>
            </div>
            <div className='dark:bg-gray-900 bg-gray-200 flex items-center w-full flex-grow px-10'>
                <div className="p-4 flex justify-center items-center dark:text-gray-900 ">
                    <div>
                        {/* <IoIosPeople className=' text-9xl' /> */}
                        <h1 className="dark:text-white text-7xl font-bold">Shopping <br /> Fake Store API</h1>
                    </div>
                </div>
                <main className="h-fit relative flex flex-col justify-center items-center rounded-lg  w-[33%] mx-auto z-50">

                    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center   w-full bg-gray-900 dark:bg-gray-100 p-6 mb-6">
                        <div className='mb-4 w-full'>
                            {/* <label className="block text-gray-700 mb-2">Username</label> */}
                            <Input
                                type="text"
                                name="username"
                                value={credentials.username}
                                handleChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                                //   className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                label="Username"
                                required
                            />
                        </div>
                        <div className='mb-4 w-full'>
                            {/* <label className="block text-gray-700 mb-2">Password</label> */}
                            <Input
                                type="password"
                                name="password"
                                value={credentials.password}
                                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                //   className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                label="Password"
                                required
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <button
                            type="submit"
                            className="w-full py-2 px-4 dark:bg-gray-900 bg-white text-gray-900 dark:text-white rounded transition"
                        >
                            Login
                        </button>
                    </form>


                </main>
                <svg
            className="hidden md:block absolute bottom-0 left-0 w-full "
            viewBox="0 0 1440 220"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="dark:fill-[#f1f1f1] fill-[#13161a]"
              d="M0,100 C360,0 1080,200 1440,150 L1440,320 L0,320 Z"
            // d="M0,256L48,240C96,224,192,192,288,160C384,128,480,96,576,112C672,128,768,192,864,208C960,224,1056,192,1152,160C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
            </div>
        </div>












    );
}