
export const handleKeydown = (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        event.stopPropagation();
    }
};