import {hashService} from "@/common/services";
import mongooseConnect from "@/config/mongoose";
import {EUserType} from "@/model-types/mongoose/user.interface";
import userRepository from "@/repositories/mongoose/user.repository";

(async () => {
    await mongooseConnect()

    const userData = [
        {
            type: EUserType.Admin,
            username: 'UserAdmin',
            password: await hashService.hash("admin")
        },
        {
            type: EUserType.Employee,
            username: "UserEmployee1",
            password: await hashService.hash('employee1')
        },
        {
            type: EUserType.Employee,
            username: "UserEmployee2",
            password: await hashService.hash('employee2')
        }
    ]

    try {
        await userRepository.seedUsers(userData)
        console.info("Seeder: Users created successfully")
        process.exit(0)
    } catch (error) {
        console.error(`Seeder: ${error}`)
        process.exit(1)
    }
})()
