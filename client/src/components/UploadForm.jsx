import React from "react";
import { Link } from "react-router-dom";
import { saveCoursework } from "../apis";

class UploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", file: null, error: null };
    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(event) {
    event.preventDefault();
    if (!this.isValid) return null;
    const data = new FormData();
    const { name, file } = this.state;
    data.append("name", name);
    data.append("file", file);
    const coursework = await saveCoursework(data);
    if (!coursework) {
      this.setState({ error: "Could not upload course work" });
    } else {
      this.props.history.push("/courseworks");
    }
  }

  onChange(field, value) {
    this.setState({
      [field]: value,
      error: null
    });
  }

  get isValid() {
    const { name, file } = this.state;
    return name && file;
  }

  render() {
    const { name, error } = this.state;
    return (
      <div className="card m-3 p-3">
        <h2>Upload course work</h2>
        <form onSubmit={this.onSubmit}>
          {error ? <div className="alert alert-danger">{error}</div> : null}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              className="form-control"
              type="text"
              value={name}
              required
              minLength="5"
              maxLength="100"
              onChange={event => {
                this.onChange("name", event.target.value);
              }}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Upload</span>
            </div>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="file"
                name="file"
                accept=".zip"
                onChange={event => {
                  const [file] = event.target.files;
                  this.onChange("file", file);
                }}
              />
              <label className="custom-file-label" htmlFor="file">
                Choose file
              </label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Upload
          </button>
          <Link to="/courseworks" className="btn btn-link">
            Cancel
          </Link>
        </form>
      </div>
    );
  }
}

export default UploadForm;
