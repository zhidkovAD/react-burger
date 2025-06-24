import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import styles from "./ingredient.module.css"
function IngredientPage() {
    return (
        <main className="page-container">
            <div className={`page-container-inner ${styles.block}`}>
                <p className={`text text_type_main-large ${styles.caption}`}>
                    {"Детали ингредиента"}
                </p>
                <IngredientDetails />
            </div>
        </main>
    );
}

export default IngredientPage;