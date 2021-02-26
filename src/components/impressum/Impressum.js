import React from 'react'
import { H1 } from '../typography'

export default function Impressum() {
    console.log("impressum page");
    return (
        <div>
            <H1>Impressum</H1>
            <p>zugleich Anbieterkennung im Sinne von §§ 5 TMG, 55 RStV</p>
            <p>
                Grossjungig UG<br></br>
                (haftungsbeschränkt)<br></br>
                Bruchwitzstr. 13<br></br>
                12247 Berlin<br></br>
            </p>
            <p>
                vertreten durch Ihren Geschäftsführer<br></br>
                Frau Anastasia Krasnoperova<br></br>
                E-Mail: <a href="mailto:info@grossjungig.de">info@grossjungig.de</a><br></br>
                Webseite <a href="http://www.grossjungig.de">www.grossjungig.de</a><br></br>
                Telefon <a href="tel:+493055231271">+49 30 55231271</a><br></br>
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz<br></br>
                DE334909009<br></br>
                Eintrag im Handelsregister<br></br>
                Amtsgericht Charlottenburg, HRB 220216 B<br></br>
            </p>

        </div>
    )
}
