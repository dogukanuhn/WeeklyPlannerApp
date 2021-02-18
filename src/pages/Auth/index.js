import Button from 'components/Button'
import Card from 'components/Card'
import Input from 'components/Input'
import React from 'react'
import styles from './auth.module.css'

import { useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { auth } from '../../redux/actions/authAction'
export default function Index() {
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()
  const history = useHistory()
  // @ts-ignore
  const { email, accessGuid } = useParams()

  const Auth = (data) => {
    var authData = {
      accessCode: data.loginCode,
      email: email,
      accessGuid: accessGuid
    }

    dispatch(auth(authData))
    history.push(`/dash`)
  }

  // console.log(watch())

  return (
    <div>
      <Card className={styles.homeCard}>
        <Card.Title>
          Ekibinle birlikte projelerini takip etmek istiyorsan bize katıl.
        </Card.Title>
        <Card.Body>
          <div>
            <div className={styles.content}>
              <form onSubmit={handleSubmit(Auth)}>
                <Input
                  type="text"
                  placeholder="E-Posta adresinize gelen kodu girin"
                  name="loginCode"
                  referance={register({ required: true, minLength: 6 })}
                />

                <Button>Devam Et</Button>
              </form>
            </div>
          </div>
        </Card.Body>
        <Card.Warning>
          <span className="warning-title">ÖNEMLİ NOT</span>
          <span className="warning-content">
            Eğer kayıtlı bir şirket panosu varsa ona dahil edilirsiniz. Yoksa
            yeni bir pano oluşturulur.
          </span>
        </Card.Warning>
      </Card>
    </div>
  )
}
