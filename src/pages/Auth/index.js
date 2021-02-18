import Button from 'components/Button'
import Card from 'components/Card'
import Input from 'components/Input'
import React, { useEffect } from 'react'
import styles from './auth.module.css'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
export default function Index() {
  const { register, handleSubmit, watch, errors } = useForm()
  const dispatch = useDispatch()

  // @ts-ignore
  const { email, accessGuid } = useParams()

  const authRequest = (data) => {
    axios
      .post(`https://localhost:5001/api/user/Authenticate`, {
        accessCode: data.loginCode,
        email: email,
        accessGuid: accessGuid
      })
      .then((x) => {
        if (!x.data.hasError) {
          dispatch({
            type: 'AddUserToken',
            action: { userToken: x.data.token }
          })
        }
      })
  }

  console.log(watch())

  return (
    <div>
      <Card className={styles.homeCard}>
        <Card.Title>
          Ekibinle birlikte projelerini takip etmek istiyorsan bize katıl.
        </Card.Title>
        <Card.Body>
          <div>
            <div className={styles.content}>
              <form onSubmit={handleSubmit(authRequest)}>
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
