import React from "react"

export default function Login() {
  return (
    <div className="relative top-1/2 m-auto w-[320px] -translate-y-1/2 transform">
      <span className="mb-[32px] block text-[22px] font-semibold text-[#a8a49c]">
        Log in to your Notion account
      </span>
      <div>
        <ul>
          <button className="relative flex w-full cursor-pointer items-center justify-center rounded-[6px] border-[1px] border-[#e6e5e3] py-[4px] hover:opacity-80">
            <svg
              className="absolute top-[48.5%] left-2.5 w-[16px] -translate-y-1/2 transform"
              viewBox="0.99 0.99 18.01 18.01"
            >
              <g clip-path="url(#clip0_2234_44729)">
                <path
                  fill="#4285F4"
                  d="M18.64 10.205q-.002-.958-.164-1.841H10v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615"
                ></path>
                <path
                  fill="#34A853"
                  d="M10 19c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H1.957v2.332A9 9 0 0 0 10 19"
                ></path>
                <path
                  fill="#FBBC04"
                  d="M4.964 11.71A5.4 5.4 0 0 1 4.682 10c0-.593.102-1.17.282-1.71V5.958H1.957A9 9 0 0 0 1 10c0 1.452.348 2.827.957 4.042z"
                ></path>
                <path
                  fill="#E94235"
                  d="M10 4.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C14.463 1.891 12.426.999 10 .999a9 9 0 0 0-8.043 4.958L4.964 8.29C5.672 6.163 7.656 4.58 10 4.58"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_2234_44729">
                  <path fill="#fff" d="M1 1h18v18H1z"></path>
                </clipPath>
              </defs>
            </svg>
            <span>Continue with Google</span>
          </button>
        </ul>
      </div>
      <form>
        <label htmlFor="email" className="text-[12px]">
          Email{" "}
        </label>
        <input
          type="text"
          id="email"
          placeholder="Enter your email address..."
          className="mb-[16px] w-full rounded-[6px] border-[1px] border-[#e6e5e3] py-[4px]"
        />
        <button
          type="submit"
          className="w-full cursor-pointer rounded-[6px] bg-[#4285F4] py-[4px] font-semibold text-[#fff] hover:opacity-80"
        >
          Continue
        </button>
      </form>
    </div>
  )
}
