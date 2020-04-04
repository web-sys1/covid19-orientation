import React, {useState} from 'react'
import PropTypes from 'prop-types'

function RadioChoices({icon, choices, name, value, onChange, children}) {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          paddingBottom: 0,
          marginBottom: 0
        }}
      >
        <div style={{flex: '0 1 40px'}}>
          <i className={`fas ${icon}`} aria-hidden='true' />
        </div>
        <div
          style={{
            flex: '1 1 auto',
            paddingBottom: 0,
            marginBottom: 0
          }}
        >
          <label>{children}</label>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row'
        }}
      >
        <div style={{flex: '0 1 60px'}} />
        {choices.map(choice => (
          <label key={choice.title} style={{margin: 0, padding: 0}}>
            <input
              name={name}
              type='radio'
              value={choice.value}
              checked={value === choice.value}
              onChange={() => onChange(choice.value)}
            />{' '}
            {choice.title}
          </label>
        ))}
      </div>
    </>
  )
}

function RiskFactors({handleRiskFactors}) {
  const [heartDisease, setHeartDisease] = useState(false)
  const [immunosuppressantDisease, setImmunosuppressantDisease] = useState(false)
  const [immunosuppressantDrug, setImmunosuppressantDrug] = useState(false)
  const [heartDiseaseAlgo, setHeartDiseaseAlgo] = useState(false)
  const [immunosuppressantDiseaseAlgo, setImmunosuppressantDiseaseAlgo] = useState(false)
  const [immunosuppressantDrugAlgo, setImmunosuppressantDrugAlgo] = useState(false)
  const [pregnant, setPregnant] = useState(false)

  const handleSubmit = event => {
    event.preventDefault()

    handleRiskFactors({
      heartDisease,
      immunosuppressantDisease,
      immunosuppressantDrug,
      heartDiseaseAlgo,
      immunosuppressantDiseaseAlgo,
      immunosuppressantDrugAlgo,
      pregnant
    })
  }

  const deriveAlgoValue = value => !(value === "0") // false si 0, true sinon

  return (
    <article className='step' id='risk-factors'>
      <h2><i className='fas fa-user-md' aria-hidden='true' /><span>Cochez les éléments de cette liste qui correspond à votre situation :</span></h2>
      <div className='card'>
        <form onSubmit={handleSubmit}>
          <div className='complement-infos'>
            <ul>
              <li style={{display: 'block'}}>
                <RadioChoices
                  icon='fa-baby'
                  name='pregnant'
                  value={pregnant}
                  onChange={value => setPregnant(value)}
                  choices={[
                    {
                      title: 'Oui',
                      value: '1'
                    },
                    {title: 'Non', value: '0'},
                    {title: 'Non applicable', value: '888'}
                  ]}
                >
                  Êtes-vous enceinte ?
                </RadioChoices>
              </li>
              <li
                style={{
                  display: 'block'
                }}
              >
                <RadioChoices
                  icon='fa-heartbeat'
                  name='heartDisease'
                  value={heartDisease}
                  onChange={value => {
                    setHeartDisease(value)
                    setHeartDiseaseAlgo(deriveAlgoValue(value))
                  }}
                  choices={[
                    {
                      title: 'Oui',
                      value: '1'
                    },
                    {title: 'Non', value: '0'},
                    {title: 'Je ne sais pas', value: '999'}
                  ]}
                >
                  Avez-vous une hypertension artérielle mal équilibrée ?
                  <br />
                  Ou une maladie cardiaque ou vasculaire ?
                  <br />
                  Ou prenez-vous un traitement à visée cardiologique ?
                </RadioChoices>
              </li>
              <li style={{display: 'block'}}>
                <RadioChoices
                  icon='fa-procedures'
                  name='immunosuppressantDisease'
                  value={immunosuppressantDisease}
                  onChange={value => {
                    setImmunosuppressantDisease(value)
                    setImmunosuppressantDiseaseAlgo(deriveAlgoValue(value))
                  }}
                  choices={[
                    {
                      title: 'Oui',
                      value: '1'
                    },
                    {title: 'Non', value: '0'},
                    {title: 'Je ne sais pas', value: '999'}
                  ]}
                >
                  Avez-vous une maladie connue pour diminuer vos défenses
                  immunitaires ?
                </RadioChoices>
              </li>
              <li style={{display: 'block'}}>
                <RadioChoices
                  icon='fa-procedures'
                  name='immunosuppressantDrug'
                  value={immunosuppressantDrug}
                  onChange={value => {
                    setImmunosuppressantDrug(value)
                    setImmunosuppressantDrugAlgo(deriveAlgoValue(value))
                  }}
                  choices={[
                    {
                      title: 'Oui',
                      value: '1'
                    },
                    {title: 'Non', value: '0'},
                    {title: 'Je ne sais pas', value: '999'}
                  ]}
                >
                  Prenez-vous un traitement immunosuppresseur ?
                </RadioChoices>
              </li>
            </ul>
          </div>

          <button className='mainbutton'>
            <span>Valider ces informations et continuer</span><i className='fas fa-check' aria-hidden='true' />
          </button>
        </form>
      </div>
    </article>
  )
}

RiskFactors.propTypes = {
  handleRiskFactors: PropTypes.func.isRequired
}

export default RiskFactors
