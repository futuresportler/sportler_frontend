// If the global.d.ts file doesn't exist, we need to create it with the proper type definitions
declare global {
  interface Window {
    recaptchaVerifier: any
  }
}

export { }
