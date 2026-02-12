import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createAdmin } from "../../features/admin/adminSlice"

const CreateAdmin = () => {
  const dispatch = useDispatch()
  const { loading, success } = useSelector(state => state.admin)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createAdmin(formData))
  }

  return (
    <div>
      <h2>Create Admin</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="firstName"
          placeholder="First name"
          onChange={handleChange}
          required
        />

        <input
          name="lastName"
          placeholder="Last name"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Admin"}
        </button>
      </form>

      {success && <p>Admin created successfully</p>}
    </div>
  )
}

export default CreateAdmin
