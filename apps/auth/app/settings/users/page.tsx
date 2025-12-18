import { UsersView } from "../../views/users-view";
import { SessionOdometer } from "./components/session-odometer";

export default function UsersPage() {
    return (
        <div className="space-y-6">
            <SessionOdometer />
            <UsersView />
        </div>
    );
}
