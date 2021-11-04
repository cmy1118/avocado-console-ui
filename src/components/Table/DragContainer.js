import React, {useCallback, useState} from 'react';
import {DragDropContext} from 'react-beautiful-dnd';
import PropTypes from 'prop-types';

const DragContainer = ({selected, children, data, setData}) => {
	const [selectedItems, setSelectedItems] = useState([]);
	const onDragStart = useCallback(
		(result) => {
			console.log('selected!');
			const items = selected[result.source.droppableId]?.map((v) => v.id);
			if (items) {
				if (items.includes(result.draggableId)) {
					setSelectedItems(items);
				} else {
					setSelectedItems([...items, result.draggableId]);
				}
			} else {
				setSelectedItems([result.draggableId]);
			}

			console.log(result);
		},
		[selected],
	);

	const onDragEnd = useCallback(
		(result) => {
			const {source, destination} = result;
			if (!destination) {
				return;
			}

			if (destination.droppableId !== source.droppableId) {
				console.log(selectedItems);
				console.log('from', data[source.droppableId]);
				console.log(
					'what',
					data[source.droppableId].filter((v) =>
						selectedItems.includes(v.id),
					),
				);
				console.log('to', data[destination.droppableId]);
				setData({
					[source.droppableId]: data[source.droppableId].filter(
						(v) => !selectedItems.includes(v.id),
					),
					[destination.droppableId]: [
						...data[destination.droppableId],
						...data[source.droppableId].filter((v) =>
							selectedItems.includes(v.id),
						),
					],
				});
			}
		},
		[data, selectedItems, setData],
	);

	return (
		<DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
			{children}
		</DragDropContext>
	);
};

DragContainer.propTypes = {
	selected: PropTypes.object,
	data: PropTypes.object,
	setData: PropTypes.func,
	children: PropTypes.array,
};

export default DragContainer;
