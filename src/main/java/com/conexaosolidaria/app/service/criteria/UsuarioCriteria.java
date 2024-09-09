package com.conexaosolidaria.app.service.criteria;

import com.conexaosolidaria.app.domain.enumeration.Ativo;
import com.conexaosolidaria.app.domain.enumeration.TipoUser;
import java.io.Serializable;
import java.util.Objects;
import java.util.Optional;
import org.springdoc.core.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.*;

/**
 * Criteria class for the {@link com.conexaosolidaria.app.domain.Usuario} entity. This class is used
 * in {@link com.conexaosolidaria.app.web.rest.UsuarioResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /usuarios?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
@SuppressWarnings("common-java:DuplicatedBlocks")
public class UsuarioCriteria implements Serializable, Criteria {

    /**
     * Class for filtering TipoUser
     */
    public static class TipoUserFilter extends Filter<TipoUser> {

        public TipoUserFilter() {}

        public TipoUserFilter(TipoUserFilter filter) {
            super(filter);
        }

        @Override
        public TipoUserFilter copy() {
            return new TipoUserFilter(this);
        }
    }

    /**
     * Class for filtering Ativo
     */
    public static class AtivoFilter extends Filter<Ativo> {

        public AtivoFilter() {}

        public AtivoFilter(AtivoFilter filter) {
            super(filter);
        }

        @Override
        public AtivoFilter copy() {
            return new AtivoFilter(this);
        }
    }

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter nome;

    private StringFilter cpf;

    private StringFilter cnpj;

    private StringFilter email;

    private TipoUserFilter tipoUser;

    private AtivoFilter ativo;

    private Boolean distinct;

    public UsuarioCriteria() {}

    public UsuarioCriteria(UsuarioCriteria other) {
        this.id = other.optionalId().map(LongFilter::copy).orElse(null);
        this.nome = other.optionalNome().map(StringFilter::copy).orElse(null);
        this.cpf = other.optionalCpf().map(StringFilter::copy).orElse(null);
        this.cnpj = other.optionalCnpj().map(StringFilter::copy).orElse(null);
        this.email = other.optionalEmail().map(StringFilter::copy).orElse(null);
        this.tipoUser = other.optionalTipoUser().map(TipoUserFilter::copy).orElse(null);
        this.ativo = other.optionalAtivo().map(AtivoFilter::copy).orElse(null);
        this.distinct = other.distinct;
    }

    @Override
    public UsuarioCriteria copy() {
        return new UsuarioCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public Optional<LongFilter> optionalId() {
        return Optional.ofNullable(id);
    }

    public LongFilter id() {
        if (id == null) {
            setId(new LongFilter());
        }
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getNome() {
        return nome;
    }

    public Optional<StringFilter> optionalNome() {
        return Optional.ofNullable(nome);
    }

    public StringFilter nome() {
        if (nome == null) {
            setNome(new StringFilter());
        }
        return nome;
    }

    public void setNome(StringFilter nome) {
        this.nome = nome;
    }

    public StringFilter getCpf() {
        return cpf;
    }

    public Optional<StringFilter> optionalCpf() {
        return Optional.ofNullable(cpf);
    }

    public StringFilter cpf() {
        if (cpf == null) {
            setCpf(new StringFilter());
        }
        return cpf;
    }

    public void setCpf(StringFilter cpf) {
        this.cpf = cpf;
    }

    public StringFilter getCnpj() {
        return cnpj;
    }

    public Optional<StringFilter> optionalCnpj() {
        return Optional.ofNullable(cnpj);
    }

    public StringFilter cnpj() {
        if (cnpj == null) {
            setCnpj(new StringFilter());
        }
        return cnpj;
    }

    public void setCnpj(StringFilter cnpj) {
        this.cnpj = cnpj;
    }

    public StringFilter getEmail() {
        return email;
    }

    public Optional<StringFilter> optionalEmail() {
        return Optional.ofNullable(email);
    }

    public StringFilter email() {
        if (email == null) {
            setEmail(new StringFilter());
        }
        return email;
    }

    public void setEmail(StringFilter email) {
        this.email = email;
    }

    public TipoUserFilter getTipoUser() {
        return tipoUser;
    }

    public Optional<TipoUserFilter> optionalTipoUser() {
        return Optional.ofNullable(tipoUser);
    }

    public TipoUserFilter tipoUser() {
        if (tipoUser == null) {
            setTipoUser(new TipoUserFilter());
        }
        return tipoUser;
    }

    public void setTipoUser(TipoUserFilter tipoUser) {
        this.tipoUser = tipoUser;
    }

    public AtivoFilter getAtivo() {
        return ativo;
    }

    public Optional<AtivoFilter> optionalAtivo() {
        return Optional.ofNullable(ativo);
    }

    public AtivoFilter ativo() {
        if (ativo == null) {
            setAtivo(new AtivoFilter());
        }
        return ativo;
    }

    public void setAtivo(AtivoFilter ativo) {
        this.ativo = ativo;
    }

    public Boolean getDistinct() {
        return distinct;
    }

    public Optional<Boolean> optionalDistinct() {
        return Optional.ofNullable(distinct);
    }

    public Boolean distinct() {
        if (distinct == null) {
            setDistinct(true);
        }
        return distinct;
    }

    public void setDistinct(Boolean distinct) {
        this.distinct = distinct;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final UsuarioCriteria that = (UsuarioCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(nome, that.nome) &&
            Objects.equals(cpf, that.cpf) &&
            Objects.equals(cnpj, that.cnpj) &&
            Objects.equals(email, that.email) &&
            Objects.equals(tipoUser, that.tipoUser) &&
            Objects.equals(ativo, that.ativo) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nome, cpf, cnpj, email, tipoUser, ativo, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UsuarioCriteria{" +
            optionalId().map(f -> "id=" + f + ", ").orElse("") +
            optionalNome().map(f -> "nome=" + f + ", ").orElse("") +
            optionalCpf().map(f -> "cpf=" + f + ", ").orElse("") +
            optionalCnpj().map(f -> "cnpj=" + f + ", ").orElse("") +
            optionalEmail().map(f -> "email=" + f + ", ").orElse("") +
            optionalTipoUser().map(f -> "tipoUser=" + f + ", ").orElse("") +
            optionalAtivo().map(f -> "ativo=" + f + ", ").orElse("") +
            optionalDistinct().map(f -> "distinct=" + f + ", ").orElse("") +
        "}";
    }
}
