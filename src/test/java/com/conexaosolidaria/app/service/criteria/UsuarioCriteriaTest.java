package com.conexaosolidaria.app.service.criteria;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.function.BiFunction;
import java.util.function.Function;
import org.assertj.core.api.Condition;
import org.junit.jupiter.api.Test;

class UsuarioCriteriaTest {

    @Test
    void newUsuarioCriteriaHasAllFiltersNullTest() {
        var usuarioCriteria = new UsuarioCriteria();
        assertThat(usuarioCriteria).is(criteriaFiltersAre(filter -> filter == null));
    }

    @Test
    void usuarioCriteriaFluentMethodsCreatesFiltersTest() {
        var usuarioCriteria = new UsuarioCriteria();

        setAllFilters(usuarioCriteria);

        assertThat(usuarioCriteria).is(criteriaFiltersAre(filter -> filter != null));
    }

    @Test
    void usuarioCriteriaCopyCreatesNullFilterTest() {
        var usuarioCriteria = new UsuarioCriteria();
        var copy = usuarioCriteria.copy();

        assertThat(usuarioCriteria).satisfies(
            criteria ->
                assertThat(criteria).is(
                    copyFiltersAre(copy, (a, b) -> (a == null || a instanceof Boolean) ? a == b : (a != b && a.equals(b)))
                ),
            criteria -> assertThat(criteria).isEqualTo(copy),
            criteria -> assertThat(criteria).hasSameHashCodeAs(copy)
        );

        assertThat(copy).satisfies(
            criteria -> assertThat(criteria).is(criteriaFiltersAre(filter -> filter == null)),
            criteria -> assertThat(criteria).isEqualTo(usuarioCriteria)
        );
    }

    @Test
    void usuarioCriteriaCopyDuplicatesEveryExistingFilterTest() {
        var usuarioCriteria = new UsuarioCriteria();
        setAllFilters(usuarioCriteria);

        var copy = usuarioCriteria.copy();

        assertThat(usuarioCriteria).satisfies(
            criteria ->
                assertThat(criteria).is(
                    copyFiltersAre(copy, (a, b) -> (a == null || a instanceof Boolean) ? a == b : (a != b && a.equals(b)))
                ),
            criteria -> assertThat(criteria).isEqualTo(copy),
            criteria -> assertThat(criteria).hasSameHashCodeAs(copy)
        );

        assertThat(copy).satisfies(
            criteria -> assertThat(criteria).is(criteriaFiltersAre(filter -> filter != null)),
            criteria -> assertThat(criteria).isEqualTo(usuarioCriteria)
        );
    }

    @Test
    void toStringVerifier() {
        var usuarioCriteria = new UsuarioCriteria();

        assertThat(usuarioCriteria).hasToString("UsuarioCriteria{}");
    }

    private static void setAllFilters(UsuarioCriteria usuarioCriteria) {
        usuarioCriteria.id();
        usuarioCriteria.nome();
        usuarioCriteria.cpf();
        usuarioCriteria.cnpj();
        usuarioCriteria.email();
        usuarioCriteria.tipoUser();
        usuarioCriteria.ativo();
        usuarioCriteria.userId();
        usuarioCriteria.distinct();
    }

    private static Condition<UsuarioCriteria> criteriaFiltersAre(Function<Object, Boolean> condition) {
        return new Condition<>(
            criteria ->
                condition.apply(criteria.getId()) &&
                condition.apply(criteria.getNome()) &&
                condition.apply(criteria.getCpf()) &&
                condition.apply(criteria.getCnpj()) &&
                condition.apply(criteria.getEmail()) &&
                condition.apply(criteria.getTipoUser()) &&
                condition.apply(criteria.getAtivo()) &&
                condition.apply(criteria.getUserId()) &&
                condition.apply(criteria.getDistinct()),
            "every filter matches"
        );
    }

    private static Condition<UsuarioCriteria> copyFiltersAre(UsuarioCriteria copy, BiFunction<Object, Object, Boolean> condition) {
        return new Condition<>(
            criteria ->
                condition.apply(criteria.getId(), copy.getId()) &&
                condition.apply(criteria.getNome(), copy.getNome()) &&
                condition.apply(criteria.getCpf(), copy.getCpf()) &&
                condition.apply(criteria.getCnpj(), copy.getCnpj()) &&
                condition.apply(criteria.getEmail(), copy.getEmail()) &&
                condition.apply(criteria.getTipoUser(), copy.getTipoUser()) &&
                condition.apply(criteria.getAtivo(), copy.getAtivo()) &&
                condition.apply(criteria.getUserId(), copy.getUserId()) &&
                condition.apply(criteria.getDistinct(), copy.getDistinct()),
            "every filter matches"
        );
    }
}
