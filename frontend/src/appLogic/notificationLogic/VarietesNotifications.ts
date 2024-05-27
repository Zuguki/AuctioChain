import NotificationLogic from "./NotificationLogic.ts";
import LogicCurrency from "../metamask/LogicCurrency.ts";

export const NotificationAddMoney = (balance: number): NotificationLogic => {
    return new NotificationLogic(
        "Успешно!",
        `Будет начислено: ${balance} ${LogicCurrency.Ac}`,
    );
};

export const NotificationTransaction: NotificationLogic = new NotificationLogic(
    "Транзакция обрабатывается!",
    "Дождитесь окончания операции.",
    1_800_000,
    true,
);

export const NotificationCreateLot: NotificationLogic = new NotificationLogic(
    "Лот успешно создан!",
    "Проверьте наличие на странице аукциона.",
);

export const NotificationUpdateLot: NotificationLogic = new NotificationLogic(
    "Лот успешно отредактирован!",
    "Проверьте изменение на странице лота.",
);

export const NotificationCreateAuction: NotificationLogic =
    new NotificationLogic(
        "Аукцион успешно создан!",
        "Проверьте наличие в личном кабинете",
    );

export const NotificationUpdateAuction: NotificationLogic =
    new NotificationLogic(
        "Аукцион успешно обновлен!",
        "Проверьте обновления на странице аукциона",
    );

export const RegistrationNotification = (userName: string): NotificationLogic =>
    new NotificationLogic(
        `Приветсвуем тебя @${userName}!`,
        "Желаем тебе успешных торгов",
    );

export const LoginNotification = (userName: string): NotificationLogic =>
    new NotificationLogic(
        "Успешный вход!",
        `Вы авторизовались под никнеймом @${userName}`,
    );

export const NotificationModeration: NotificationLogic = new NotificationLogic(
    "Успешно!",
    "Действия модератора были применены к аукциону.",
);
