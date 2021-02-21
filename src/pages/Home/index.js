import Button from 'components/Button'
import Card from 'components/Card'
import Input from 'components/Input'
import React, { useState } from 'react'
import styles from './home.module.css'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import Select from 'components/Select'
export default function Index() {
  const [tab, setTab] = useState(0)

  const { register, handleSubmit, watch, errors } = useForm()

  const history = useHistory()

  const registerRequest = (data) => {
    axios
      .post('https://localhost:5001/api/user/register', {
        firstName: data.name,
        surname: data.surname,
        email: data.email,
        role: data.role
      })
      .then((x) => {
        if (!x.data.hasError) {
          setTab(0)
        }
      })
  }

  const loginRequest = (data) => {
    axios
      .get(`https://localhost:5001/api/user/login?email=${data.email}`)
      .then((x) => {
        if (!x.data.hasError) {
          history.push(`/auth/${data.email}/${x.data.accessGuid}`)
        }
      })
  }

  console.log(watch())

  return (
    <div className="center-main">
      <Card className={styles.homeCard}>
        <Card.Title>
          Ekibinle birlikte projelerini takip etmek istiyorsan bize katıl.
        </Card.Title>
        <Card.Body>
          {tab === 0 && (
            <div>
              <div className={styles.content}>
                <form onSubmit={handleSubmit(loginRequest)}>
                  <Input
                    type="text"
                    placeholder="E-Posta Adresi*"
                    name="email"
                    referance={register({ required: true })}
                  />
                  {errors.email?.type === 'required' && 'Gerekli*'}
                  <Button>Devam Et</Button>
                </form>
              </div>
              <span className={styles.registerText} onClick={(x) => setTab(1)}>
                Kayıt olmak için tıklayınız.
              </span>
            </div>
          )}
          {tab === 1 && (
            <div>
              <div className={styles.content}>
                <form onSubmit={handleSubmit(registerRequest)}>
                  <Input
                    name="name"
                    type="text"
                    placeholder="Adınız"
                    referance={register({ required: true })}
                  />
                  {errors.name?.type === 'required' && 'Gerekli*'}

                  <Input
                    name="surname"
                    type="text"
                    placeholder="Soyadınız"
                    referance={register({ required: true })}
                  />
                  {errors.surname?.type === 'required' && 'Gerekli*'}
                  <Input
                    type="email"
                    name="email"
                    placeholder="E-Posta Adresi"
                    referance={register({
                      required: true,
                      pattern: /\S+@\S+\.\S+/
                    })}
                  />
                  {errors.email?.type === 'required' && 'Gerekli*'}
                  {errors.email?.type === 'pattern' && 'mail girin'}

                  <Select name="role" reference={register}>
                    <option>Product Manager</option>
                  </Select>
                  <Button>Devam Et</Button>
                </form>
              </div>
              <span className={styles.registerText} onClick={(x) => setTab(0)}>
                Giriş yapmak için tıklayınız.
              </span>
            </div>
          )}
        </Card.Body>
        <Card.Warning className="">
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
