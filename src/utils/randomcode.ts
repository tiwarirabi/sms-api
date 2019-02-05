/**
 * generate random code
 */
export default function randomCode(codeLength: number) {
  let code = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  for (let i = 0; i < codeLength; i++) {
    code += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return code;
}
