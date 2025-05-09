import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Popover } from '@mui/material';
import { makeStyles } from '@mui/styles';

import Tooltip from './Tooltip';
import { getItemImage } from '../Inventory/item';
import { useTheme } from '@mui/material/styles';

const useStyles = makeStyles((theme) => ({
	reagentContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
		width: "100%",
	  },
	  reagentItem: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: "auto",
		aspectRatio: "1 / 1",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		borderRadius: 8,
		padding: 0,
		margin: 0,
		boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)",
		overflow: "hidden",
		transition: "all 0.2s ease",
		"&:hover": {
		  transform: "translateY(-2px)",
		  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.25)",
		},
	  },
	  ingImg: {
		width: "50%",
		height: "auto",
		objectFit: "contain",
	  },
	  countDisplay: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		fontSize: "14px",
		marginTop: 4,
	  },
	  invalid: {
		color: theme.palette.error.main,
	  },
	  itemLabel: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		paddingTop: 6,
		textAlign: "center",
		color: "#fff",
		fontSize: "12px",
		whiteSpace: "nowrap",
		textOverflow: "ellipsis",
		maxWidth: "100%",
	  },
	  popover: {
		pointerEvents: "none",
	  },
	  paper: {
		padding: 15,
		border: `1px solid rgba(255, 255, 255, 0.1)`,
		borderRadius: 8,
		//backdropFilter: "blur(10px)",
		background: "rgba(18, 18, 28, 0.95)",
		boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
		"&.rarity-1": {
		  borderLeft: `3px solid ${theme.palette.rarities.rare1}`,
		},
		"&.rarity-2": {
		  borderLeft: `3px solid ${theme.palette.rarities.rare2}`,
		},
		"&.rarity-3": {
		  borderLeft: `3px solid ${theme.palette.rarities.rare3}`,
		},
		"&.rarity-4": {
		  borderLeft: `3px solid ${theme.palette.rarities.rare4}`,
		},
		"&.rarity-5": {
		  borderLeft: `3px solid ${theme.palette.rarities.rare5}`,
		},
	  },
}));

export default ({ item, qty }) => {
	const classes = useStyles();
	const hidden = useSelector((state) => state.app.hidden);
	const items = useSelector((state) => state.inventory.items);
	const myCounts = useSelector((state) => state.crafting.myCounts);
	const theme = useTheme();
	let itemData = items[item.name];

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const tooltipOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const tooltipClose = () => {
		setAnchorEl(null);
	};

	const hasItems =
		Boolean(myCounts[item.name]) && myCounts[item.name] >= item.count * qty;

	const getRarityColor = (rarity) => {
		switch (rarity) {
			case 1:
				return theme.palette.rarities.rare1;
			case 2:
				return theme.palette.rarities.rare2;
			case 3:
				return theme.palette.rarities.rare3;
			case 4:
				return theme.palette.rarities.rare4;
			case 5:
				return theme.palette.rarities.rare5;
			default:
				return theme.palette.rarities.rare1;
		}
	};

	return (
		<div style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
				//backgroundColor: "orange",
			}}>
			<div
				onMouseEnter={Boolean(itemData) ? tooltipOpen : null}
				onMouseLeave={Boolean(itemData) ? tooltipClose : null}
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					width: "100%",
					height: "auto",
					aspectRatio: '1 / 1',
					backgroundColor: "rgba(0, 0, 0, 0.5)",
					borderRadius: "1.25vh",
					padding: 0,
					margin: 0,
					boxShadow: `inset 0 0 1vh ${getRarityColor(itemData?.rarity)}`,
					objectFit: "cover",
				}}
			>
				<div 
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "column",
					}}
				>
					<img
						className={classes.ingImg}
						src={getItemImage(item, itemData)}
					/>


					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							flexDirection: "row",
						}}
					>

						<span
							style={{
								fontSize: '1.5vh',
							}}
						>{`${
							Boolean(myCounts[item.name])
								? myCounts[item.name]
								: 0
							} / `}
							<span className={hasItems ? null : classes.invalid}>
								{item.count * qty}
							</span>
						</span>

					</div>
				</div>
			</div>
			<div style={{
				 display: "flex",
				 alignItems: "center",
				 justifyContent: "center",
				 paddingTop: "0.5vh",
				 textAlign: 'center',
				 color: '#fff',
				 fontSize: '1.25vh',  // Base font size
				 //fontSize: "clamp(0.5vh, 1vh, 1.5vh)",
				 whiteSpace: "nowrap",  // Prevents wrapping
				 //overflow: "hidden",  // Hides overflow
				 textOverflow: "ellipsis",  // Optional: Adds '...' when text is too long
				 maxWidth: "100%",  //
				//backgroundColor: "yellow",
			}}>
				{itemData.label}
			</div>
			
			<Popover
				className={classes.popover}
				classes={{
					paper: `${classes.paper} rarity-${itemData.rarity}`,
				}}
				open={open && !hidden}
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'center',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				onClose={tooltipClose}
				disableRestoreFocus
			>
				<Tooltip item={itemData} count={item.count} />
			</Popover>
		</div>
	);
};
