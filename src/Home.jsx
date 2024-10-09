import React, { useState } from 'react'

const Home = () => {
    const itemName = 'FIREIMG';
    const itemPrice = 500;
    const [quantity, setQuantity] = useState(1);
    const [finalAmount, setFinalAmount] = useState(itemPrice)

    const decrement = () => {
        if(quantity <= 1) {
            setQuantity(1)
            setFinalAmount(itemPrice)
        } else if(quantity > 1) {
            setQuantity(quantity - 1)
            setFinalAmount(finalAmount - itemPrice)
        }
    }

    const increment = () => {
        setQuantity(quantity + 1)
        setFinalAmount(finalAmount + itemPrice)
    }

    const checkout = async() => {
        try {
            const res = await fetch('http://localhost:4000/checkout', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: "cors",
                body: JSON.stringify({
                    items: [{  // Fixed: changed from item to items
                        id: 1,
                        quantity: quantity,  // Fixed: use the actual quantity from state
                        price: itemPrice,
                        name: itemName
                    }]
                })
            });
            const data = await res.json();
            window.location = data.url
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <button onClick={checkout}>Checkout</button>
        </div>
    )
}

export default Home