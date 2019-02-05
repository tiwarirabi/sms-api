/**
 * generate random code
 */
export default async function randomCode(codeLength: number) {
  let code = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < codeLength; i++) {
    code += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return code;
}
