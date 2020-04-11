const cose_alg_ECDSA_w_SHA256 = -7;

export const makeAuthenticationChallenge = async () => {
  const createCredentialOptions: CredentialCreationOptions = {
    publicKey: {
      rp: {
        name: "WebAuthn Art",
        id: window.location.hostname,
        icon: "https://fido2life.com/favicon.ico",
      },
      challenge: crypto.getRandomValues(new Uint8Array(26)),
      user: {
        id: crypto.getRandomValues(new Uint8Array(16)),
        name: "anon-user",
        displayName: "Anonymous User",
      },
      pubKeyCredParams: [
        {
          type: "public-key",
          alg: cose_alg_ECDSA_w_SHA256,
        },
      ],
      timeout: 60000,
    },
  };

  try {
    return (await navigator.credentials.create(
      createCredentialOptions
    )) as PublicKeyCredential | null;
  } catch (err) {
    console.error(err);
  }
};
