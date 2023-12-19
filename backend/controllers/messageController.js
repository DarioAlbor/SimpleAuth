const createMessage = async (user, content) => {
    try {
        const newMessage = await Message.create({
            senderId: user.id,
            receiverId: null, // Puedes ajustar esto según tu lógica
            text: content,
        });

        return newMessage;
    } catch (error) {
        console.error('Error al crear el mensaje:', error);
        throw error;
    }
};
