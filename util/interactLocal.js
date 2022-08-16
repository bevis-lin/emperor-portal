export const signMessage = async () => {
  try {
    const messageToSign =
      'Welcome to vist Emperor, this request is to get a signature from you, here after we will use this signature to get your wallet address';
    console.log('signing message...');
    const from = window.ethereum.selectedAddress;
    const sign = await window.ethereum.request({
      method: 'personal_sign',
      params: [messageToSign, from, 'emperor'],
    });

    console.log('sign : ' + sign);

    return {
      success: true,
      status: 'Sign successfully',
      data: sign,
    };
  } catch (error) {
    return {
      success: false,
      status: '😥 Something went wrong: ' + error.message,
    };
  }
};
