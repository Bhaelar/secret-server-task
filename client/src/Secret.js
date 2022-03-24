import React from "react";

const Secret = ({ secret }) => {
	return (
		<div>
			<div>
				<b>Hash:</b> {secret.hash}
			</div>
			<div>
				<b>Secret:</b> {secret.secretText}
			</div>
			<div>
				<b>Created at:</b> {secret.createdAt}
			</div>
			<div>
				<b>Expires at:</b>{" "}
				{secret.expiresAt === null ? "Never" : secret.expiresAt}
			</div>
		</div>
	);
};
export default Secret;
