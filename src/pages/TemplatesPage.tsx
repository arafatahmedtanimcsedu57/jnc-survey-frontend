import React, { PropsWithChildren, useEffect, useState } from 'react';
import { Card } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getAllTemplates } from '../redux/entities/formBuilderEntity';

import NewFormDialogComponent from '../components/FormTemplates/NewFormDialogComponent';
import FormLayoutComponent from '../components/FormTemplates/FormLayoutComponent';

import Arrow from './../assets/red-arrow.png';
import { getAllClients } from '../redux/entities/clientsEntity';

interface TemplatesPageProps {}

const TemplatesPage: React.FC<PropsWithChildren<TemplatesPageProps>> = ({}) => {
	const dispatch = useAppDispatch();
	const templates = useAppSelector(
		(state) => state.entities.formBuilder.allTemplates,
	);
	const clients = useAppSelector((state) => state.entities.client.allClients);

	const authToken = useAppSelector((state) => state.user.access.token);

	const [openDialog, setOpenDialog] = useState<boolean>(false);

	useEffect(() => {
		if (authToken) {
			dispatch(getAllTemplates('GET ALL TEMPLATE'));
			dispatch(getAllClients('GET ALL CLIENTS'));
		}
	}, [authToken]);

	return (
		<div className="container-fluid">
			<div className=" container main-container">
				<div className="p-5 d-flex flex-column align-items-center gap-5">
					<div className="lighting-border px-5">
						<div className="px-5 py-4 text__welcome text-center ">
							<div className="">
								<span className="text-muted">Build</span>{' '}
								<span className="text-primary">beautiful forms</span>
							</div>
							<div className="pt-0 text-dark-emphasis">in seconds</div>
						</div>
					</div>
					<div className="d-flex flex-wrap gap-5">
						{/* Create New */}
						<FormLayoutComponent
							template={null}
							createdFormLayout={false}
							setOpenDialog={setOpenDialog}
						/>

						{authToken ? (
							<>
								<div className="w-100 text-center">
									<h6 className="text-primary">Single or multi-page forms</h6>
									<h3 className="text-info-emphasis fw-bolder">
										Discover our beautiful templates
									</h3>
									<div className="text-muted">
										Our collection of beautiful templates to create your own
										forms!
									</div>
								</div>
								<div className="d-flex flex-wrap gap-5 justify-content-center w-100">
									{templates.length ? (
										templates.map((template) => (
											<FormLayoutComponent
												key={template.id}
												template={template}
												createdFormLayout={true}
											/>
										))
									) : (
										<></>
									)}
								</div>
							</>
						) : (
							<></>
						)}
						<hr />
						{authToken ? (
							<>
								<div className="w-100 text-center">
									<h3 className="text-info-emphasis fw-bolder">
										Trusted by the bests
									</h3>
								</div>

								<div className="d-flex flex-wrap gap-5 justify-content-center w-100">
									{clients.length ? (
										clients.map((client) => {
											return (
												<div className="card p-4" style={{ width: '250px' }}>
													<img
														src={`${client.imageUrl}`}
														className="card-img-top"
														alt="..."
													/>
													<div className="card-body d-flex flex-column align-items-start justify-content-between px-0">
														<h6 className="card-title">{client.name}</h6>
														<p className="card-text">{client.email}</p>
													</div>
												</div>
											);
										})
									) : (
										<></>
									)}
								</div>
							</>
						) : (
							<></>
						)}
					</div>
				</div>
				<NewFormDialogComponent
					openDialog={openDialog}
					setOpenDialog={setOpenDialog}
				/>
			</div>
		</div>
	);
};

export default TemplatesPage;
