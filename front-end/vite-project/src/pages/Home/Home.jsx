import React from 'react';


import iconMoney from '../../assets/icons/icon-money.webp';
import iconSecurity from '../../assets/icons/icon-security.webp';
import FeaturesItemData from '../../data/FeaturesItemData.json';
import iconChat from '../../assets/icons/icon-chat.webp';
import '../../sass/pages/_Home.scss';

import Banner from '../../components/Banner.jsx';
import Item from '../../components/Item.jsx';


/* Home page */
function Home () {
    const imageData = {
        "icon-chat.webp": iconChat,
        "icon-money.webp": iconMoney,
        "icon-security.webp": iconSecurity
    }

    return (
        <div className='homepage'>
            <main>
                 
                <Banner />
                <section className="features">
                  
               
                    {FeaturesItemData.map((data) => (
                        /* Retourner item component */
                        < Item 
                            key={data.id}
                            image={imageData[data.image]}
                            descriptionImage={data.descriptionImage}
                            title={data.title}
                            description={data.description}
                        />
                    ))}
                </section>
            </main>
        </div>
    )
}

export default Home