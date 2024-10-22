import React from 'react'
import { PaystackButton } from "react-paystack"
const PaystackPayment = () => {
    const publicKey = 'pk_test_83859b0cedba03f3df49b0c180548841485ba421';
    const [email, setEmail] = useState('');
  const [amount, setAmount] = useState(1000); // Amount in kobo
  const [name, setName] = useState('');

  const onSuccess = (reference) => {
    // Send the reference to the backend to verify payment
    axios.post('/verify-payment', { reference: reference.reference })
      .then(response => {
        alert('Payment verified successfully!');
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error verifying payment:', error);
        alert('Payment verification failed');
      });
  };

  const componentProps = {
    email,
    amount: amount * 100, // Convert Naira to Kobo
    metadata: {
      name,
      phone: "your-phone-number",
    },
    publicKey,
    text: 'Pay Now',
    onSuccess,
    onClose: () => alert('Payment Closed'),
  };

  return (
    <div className="flex flex-col items-center p-4">
      <input
        type="text"
        className="border rounded-md p-2 mb-4 w-full max-w-sm"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        className="border rounded-md p-2 mb-4 w-full max-w-sm"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="number"
        className="border rounded-md p-2 mb-4 w-full max-w-sm"
        placeholder="Amount (Naira)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <PaystackButton
        className="bg-blue-500 text-white py-2 px-4 rounded-lg"
        {...componentProps}
      />
    </div>
  );
};
export default PaystackPayment
