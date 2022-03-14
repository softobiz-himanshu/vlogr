import { SigninDto, SignupDto, User } from '@/interfaces/app'
import { IElement, IFontFamily, IUpload } from '@/interfaces/editor'
import { uniqueFilename } from '@/utils/unique'
import axios, { AxiosInstance } from 'axios'


type Template = any
class ApiService {
  base: AxiosInstance
  constructor() {
    this.base = axios.create({
      baseURL: 'https://api.scenify.io',
      // baseURL: 'http://localhost:8080',
      headers: {
        Authorization: 'Bearer Q2dK9EiXaJ7Ap3MaKzEHj0af',
      },
    })
  }

  // UPLOADS
  getSignedURLForUpload(props: { name: string }): Promise<{ url: string }> {
    return new Promise((resolve, reject) => {
      this.base
        .post('/uploads', props)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(err => reject(err))
    })
  }

  updateUploadFile(props: { name: string, previewName?: string }): Promise<any> {
    return new Promise((resolve, reject) => {
      this.base
        .put('/uploads', props)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(err => reject(err))
    })
  }

  getUploads(): Promise<IUpload[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.base.get('/uploads')
        resolve(data.data)
      } catch (err) {
        reject(err)
      }
    })
  }

  deleteUpload(id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.base.delete(`/uploads/${id}`)
        resolve(response)
      } catch (err) {
        reject(err)
      }
    })
  }

  // AUTH
  signin(props: SigninDto): Promise<User> {
    return new Promise((resolve, reject) => {
      this.base
        .post('/auth/signin', props)
        .then(({ data }) => {
          resolve(data.data)
        })
        .catch(err => reject(err))
    })
  }

  signup(props: SignupDto): Promise<User> {
    return new Promise((resolve, reject) => {
      this.base
        .post('/auth/signup', props)
        .then(({ data }) => {
          resolve(data.data)
        })
        .catch(err => reject(err))
    })
  }

  getFacebookAuthURL(props: { action: string }) {
    return new Promise((resolve, reject) => {
      this.base
        .post('/auth/facebook/url', props)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(err => reject(err))
    })
  }

  getGooogleAuthURL(props: { action: string }) {
    return new Promise((resolve, reject) => {
      this.base
        .post('/auth/google/url', props)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(err => reject(err))
    })
  }

  getCurrentUser(props: { token: string }) {
    return new Promise((resolve, reject) => {
      this.base
        .post('/auth/me', props)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(err => reject(err))
    })
  }

  // CREATIONS
  createCreation(props: Partial<Template>): Promise<Template> {
    return new Promise((resolve, reject) => {
      this.base
        .post('/creations', props)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(err => reject(err))
    })
  }

  getCreations(): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.base.get('/creations')
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  }

  getCreationById(id: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.base.get(`/creations/${id}`)
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  }
  updateCreation(id: string, props: Partial<Template>): Promise<Template> {
    return new Promise((resolve, reject) => {
      this.base
        .put(`/creations/${id}`, props)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(err => reject(err))
    })
  }

  // TEMPLATES

  createTemplate(props: Partial<Template>): Promise<Template> {
    return new Promise((resolve, reject) => {
      this.base
        .post('/templates', props)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(err => reject(err))
    })
  }

  downloadTemplate(props: Partial<Template>): Promise<{ source: string }> {
    return new Promise((resolve, reject) => {
      this.base
        .post('/templates/download', props)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(err => reject(err))
    })
  }

  getTemplates(): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.base.get('/templates')
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  }

  // ELEMENTS
  getElements(): Promise<IElement[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.base.get('/elements')
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  }
  updateTemplate(id: number, props: Partial<Template>): Promise<Template> {
    return new Promise((resolve, reject) => {
      this.base
        .put(`/templates/${id}`, props)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(err => reject(err))
    })
  }
  // FONTS
  getFonts(): Promise<IFontFamily[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.base.get('/fonts')
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  }

  async uploadPreview(file: File) {
    const updatedFileName = uniqueFilename(file.name);

    const updatedFile = new File([file], updatedFileName)
    const response = await this.getSignedURLForUpload({ name: updatedFileName });

    await axios.put(response.url, updatedFile, {
      headers: { 'Content-Type': file.type },
      onUploadProgress: progressEvent => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      },
    })

    return await this.updateUploadFile({ name: updatedFileName })
  }
}

export default new ApiService()
