import React from 'react'
import CookieConsent from '../../CookieConsent';
import "./consent.css"

const Consent = () => {

    const [ccDisplayed, setCcDisplayed] = React.useState(false)
    React.useEffect(() => {
        const ccConfirmed = localStorage.getItem('ccConfirmed')
        if (!ccConfirmed) setCcDisplayed(true);
    }, [])
    const confirmCc = () => {
        setCcDisplayed(false)
        localStorage.setItem('ccConfirmed', 'true');
    };
    return (
        <div className="cc__bottom">
            {ccDisplayed ? <CookieConsent clicked={confirmCc} /> : null}
        </div>
    )
}

export default Consent
