
interface CardProps {
    back?: boolean,
    number: string,
    expires: string,
    cvc: string,
    owner: string
}
const Card: React.FC<CardProps> = ({ back = false, number, expires, cvc, owner }) => {
    const numberItems = number.split(' ');
    const expiresItems = expires.split(' ');

    return (
        <div className='main-container'>
            <div className='scene'>
                <div className={back ? 'card is-flipped' : 'card'}>
                    <div className='card__front'>
                        <div className='card__number number'>
                            <div className='number-group number-group--0'>
                                {numberItems[0] ? numberItems[0] : '****'}
                            </div>
                            <div className='number-group number-group--1'>
                                {numberItems[1] ? numberItems[1] : '****'}
                            </div>
                            <div className='number-group number-group--2'>
                                {numberItems[2] ? numberItems[2] : '****'}
                            </div>
                            <div className='number-group number-group--3'>
                                {numberItems[3] ? numberItems[3] : '****'}
                            </div>
                        </div>
                        <div className='card__details'>
                            <div className='card__holder'>
                                <span className='card__holder_title'>Владелец</span>
                                <span className='card__holder_name'>{owner}</span>
                            </div>
                            <div className='card__expiration'>
                                <span className='card__expiration_title'>Истекает</span>
                                <span className='card__expiration_date'>{expiresItems[0] || '**/**'}</span>
                            </div>
                        </div>
                    </div>
                    <div className='card__back'>
                        <div className='card__stripe'></div>
                        <div className='card__signature'>
                            <span className='card__cvv'>Код</span>
                            <span className='card__cvv-number'>{cvc ? cvc : '***'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Card;