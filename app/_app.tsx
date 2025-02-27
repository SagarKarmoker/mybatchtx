"use client"
import React, { useState } from 'react'
import ConnectWallet from './components/ConnectWallet'

interface SendFormat {
    address: string;
    amount: string;
}

export default function MyApp() {
    const [addresses, setAddresses] = useState<string[]>([])
    const [amounts, setAmounts] = useState<string[]>([])
    const [inputText, setInputText] = useState<string>('')
    const [sendFormat, setSendFormat] = useState<SendFormat[]>([])
    const [error, setError] = useState<string | null>(null)
    
    const checkAddresses = (addresses: string[]): boolean => {
        if(addresses.length === 0) {
            setError('No addresses provided')
            return false
        }

        let isValid = true
        addresses.forEach(address => {
            if(!address || !address.startsWith('0x')) {
                setError('Invalid address format: ' + address)
                isValid = false
            }
        })
        
        return isValid
    }

    const parseInput = (text: string) => {
        setError(null)
        const lines = text.trim().split('\n')
        const newSendFormat: SendFormat[] = []
        
        lines.forEach(line => {
            const [address, amount] = line.split(',').map(item => item.trim())
            if (address && amount) {
                newSendFormat.push({ address, amount })
            }
        })
        
        const addressList = newSendFormat.map(item => item.address)
        const amountList = newSendFormat.map(item => item.amount)
        
        setAddresses(addressList)
        setAmounts(amountList)
        setSendFormat(newSendFormat)
        
        return newSendFormat
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputText(e.target.value)
        parseInput(e.target.value)
    }

    const handleSendButton = () => {
        const parsedData = parseInput(inputText)
        const addressList = parsedData.map(item => item.address)
        
        if (checkAddresses(addressList)) {
            console.log('Ready to send to:', parsedData)
            // Add your transaction logic here
            // For example, call a smart contract function
        }
    }

    return (
        <>
            <div>
                <h1 className="text-center text-4xl font-bold pt-10 underline">My Batch Tx Dapps</h1>
                <div className="text-center pt-10">
                    <ConnectWallet />
                </div>
            </div>

            <div className='flex flex-col items-center pt-10'>
                <div className='mb-4 text-sm text-gray-600'>
                    Enter one address and amount per line (format: 0xAddress, amount)
                </div>
                <div className='w-full max-w-lg'>
                    <textarea 
                        className='border-2 p-2 w-full h-48 rounded'
                        placeholder='0x123..., 0.1&#10;0x456..., 0.2'
                        value={inputText}
                        onChange={handleInputChange}
                    />
                    {error && <div className='text-red-500 mt-2'>{error}</div>}
                    <div className='mt-2'>
                        Parsed {sendFormat.length} transactions
                    </div>
                </div>
                <button 
                    className='mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400'
                    onClick={handleSendButton}
                    disabled={sendFormat.length === 0 || !!error}
                >
                    Send Transactions
                </button>
            </div>
        </>
    )
}
