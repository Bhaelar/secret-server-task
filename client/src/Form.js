import React, { useState } from "react";

const Form = ({ onSubmit }) => {
	const [formData, setFormData] = useState({
		secret: "",
		expireAfter: "",
	});
	const { secret, expireAfter } = formData;
	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	return (
		<div className="form">
			<form onSubmit={(e) => onSubmit(e, formData)}>
				<div className="mb-3">
					<label htmlFor="secretText" className="form-label">
						Secret text
					</label>
					<input
						type="text"
						className="form-control"
						id="secretText"
						name="secret"
						value={secret}
						onChange={onChange}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="expiresAfter" className="form-label">
						Expires After
					</label>
					<input
						type="number"
						className="form-control"
						id="expiresAfter"
						name="expireAfter"
						value={expireAfter}
						onChange={onChange}
					/>
				</div>
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</div>
	);
};

export default Form;
