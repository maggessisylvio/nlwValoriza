import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"
import { UsersRepositories } from "../repositories/UsersRepositories";

interface iComplimentRequest {
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}

class CreateComplimentService {

    async execute({ tag_id, user_sender, user_receiver, message }: iComplimentRequest) {
        const complimentsRepository = getCustomRepository(ComplimentsRepositories);
        const usersRepository = getCustomRepository(UsersRepositories);

        if (user_sender === user_receiver) {
            throw new Error("Incorrect user receiver");
        }

        const userReceiverExists = await usersRepository.findOne(user_receiver);

        if (!userReceiverExists) {
            throw new Error("User receiver does not exists");
        }

        const compliment = complimentsRepository.create({
            tag_id,
            user_receiver,
            user_sender,
            message
        });

        await complimentsRepository.save(compliment);

        return compliment;
    }
}

export { CreateComplimentService };