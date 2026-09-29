import { useState } from 'react';
import { FaCheckCircle, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { BRAND_NAME } from '../constants';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const INITIAL_FORM = { name: '', email: '', date: '', guests: '', requests: '' };
const GUEST_OPTIONS = [
  { value: '1', label: '1 Person' },
  { value: '2', label: '2 People' },
  { value: '3', label: '3 People' },
  { value: '4', label: '4 People' },
  { value: '5', label: '5 People' },
  { value: '6+', label: '6+ People' },
];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Today's date in the visitor's local time zone, formatted as YYYY-MM-DD. */
function getTodayISO() {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

function validate(values, today) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = 'Please enter your name.';
  if (!values.email.trim()) errors.email = 'Please enter your email.';
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Please enter a valid email address.';
  if (!values.date) errors.date = 'Please choose a date.';
  else if (values.date < today) errors.date = 'The date cannot be in the past.';
  if (!GUEST_OPTIONS.some((option) => option.value === values.guests)) errors.guests = 'Please select the number of guests.';
  if (values.requests.length > 500) errors.requests = 'Please keep special requests under 500 characters.';
  return errors;
}

const CONTACT_DETAILS = [
  {
    Icon: FaMapMarkerAlt,
    title: 'Location',
    content: (
      <>
        123 Cocktail Avenue, Mixology District
        <br />
        New York, NY 10012
      </>
    ),
  },
  { Icon: FaPhoneAlt, title: 'Phone', content: <a href="tel:+15551234567">+1 (555) 123-4567</a> },
  {
    Icon: FaEnvelope,
    title: 'Email',
    content: <a href="mailto:reservations@amberlounge.com">reservations@amberlounge.com</a>,
  },
];

const inputClass = (hasError) =>
  `w-full bg-black/20 border rounded-xl px-5 py-3.5 text-white placeholder:text-neutral-600 focus:outline-none transition-colors ${
    hasError ? 'border-red-400/70 focus-visible:border-red-400' : 'border-white/10 focus-visible:border-amber-500/60'
  }`;
const labelClass = 'block text-xs uppercase tracking-wider text-neutral-400 font-medium ml-1';

const Field = ({ id, label, error, children }) => (
  <div className="space-y-2">
    <label htmlFor={id} className={labelClass}>
      {label}
    </label>
    {children}
    {error && (
      <p id={`${id}-error`} className="text-sm text-red-400 ml-1">
        {error}
      </p>
    )}
  </div>
);

const Contact = () => {
  useDocumentTitle('Reservations');
  const [today] = useState(getTodayISO);
  const [values, setValues] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextValues = { ...values, [name]: value };
    setValues(nextValues);
    // After the first submit attempt, re-validate as the visitor types.
    if (submitted) setErrors(validate(nextValues, today));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    const nextErrors = validate(values, today);
    setErrors(nextErrors);

    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      document.getElementById(`reservation-${firstInvalid}`)?.focus();
      return;
    }

    // No backend: show a confirmation instead of sending the request anywhere.
    setConfirmation({ ...values, name: values.name.trim(), email: values.email.trim() });
    setValues(INITIAL_FORM);
    setErrors({});
    setSubmitted(false);
  };

  const fieldProps = (name) => ({
    id: `reservation-${name}`,
    name,
    value: values[name],
    onChange: handleChange,
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `reservation-${name}-error` : undefined,
    className: inputClass(errors[name]),
  });

  const formattedDate = confirmation
    ? new Date(`${confirmation.date}T00:00:00`).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  return (
    <div className="flex-grow pt-32 pb-20 px-6 flex justify-center items-center relative overflow-hidden bg-neutral-950">
      <div className="absolute bottom-0 left-0 w-[600px] max-w-full h-[600px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
        <div className="flex flex-col justify-center">
          <p className="text-amber-500 text-sm uppercase tracking-[0.3em] font-bold mb-4">Reservations</p>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
            Join Us for <br />
            an Evening
          </h1>
          <p className="text-neutral-400 mb-12 text-lg leading-relaxed max-w-md">
            Whether you&apos;re celebrating a special occasion or simply savoring the night, we look forward to hosting
            you at {BRAND_NAME}.
          </p>

          <ul className="space-y-8">
            {CONTACT_DETAILS.map(({ Icon, title, content }) => (
              <li key={title} className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-amber-500 shrink-0 border border-white/10">
                  <Icon className="text-lg" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-white font-medium mb-1 text-lg">{title}</h2>
                  <p className="text-neutral-400 [&_a]:hover:text-amber-400 [&_a]:transition-colors break-words">
                    {content}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-[50px] rounded-full pointer-events-none" />

          {confirmation ? (
            <div role="status" className="relative flex flex-col items-center text-center py-10">
              <FaCheckCircle className="text-5xl text-amber-500 mb-6" aria-hidden="true" />
              <h2 className="text-3xl font-serif text-white mb-4">Request received</h2>
              <p className="text-neutral-400 leading-relaxed max-w-sm mb-8">
                Thank you, {confirmation.name}. We&apos;ve noted your table for{' '}
                {GUEST_OPTIONS.find((option) => option.value === confirmation.guests)?.label.toLowerCase()} on{' '}
                {formattedDate}. We&apos;ll confirm at{' '}
                <span className="text-white break-all">{confirmation.email}</span>.
              </p>
              <p className="text-xs text-neutral-600 mb-8 -mt-4">Demo form: no data was sent anywhere.</p>
              <button
                type="button"
                onClick={() => setConfirmation(null)}
                className="px-8 py-3.5 border border-white/15 hover:border-amber-500/50 text-white hover:text-amber-400 font-semibold rounded-xl transition-colors"
              >
                Make another reservation
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-serif text-white mb-8">Request a Table</h2>
              <form className="space-y-6 relative" onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field id="reservation-name" label="Name" error={errors.name}>
                    <input type="text" autoComplete="name" placeholder="John Doe" required {...fieldProps('name')} />
                  </Field>
                  <Field id="reservation-email" label="Email" error={errors.email}>
                    <input
                      type="email"
                      autoComplete="email"
                      placeholder="john@example.com"
                      required
                      {...fieldProps('email')}
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field id="reservation-date" label="Date" error={errors.date}>
                    <input type="date" min={today} required {...fieldProps('date')} style={{ colorScheme: 'dark' }} />
                  </Field>
                  <Field id="reservation-guests" label="Guests" error={errors.guests}>
                    <select required {...fieldProps('guests')} style={{ colorScheme: 'dark' }}>
                      <option value="" disabled>
                        Select guests
                      </option>
                      {GUEST_OPTIONS.map(({ value, label }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field id="reservation-requests" label="Special Requests (optional)" error={errors.requests}>
                  <textarea
                    rows="3"
                    maxLength={500}
                    placeholder="Any dietary requirements or special occasions?"
                    {...fieldProps('requests')}
                    className={`${inputClass(errors.requests)} resize-none`}
                  />
                </Field>

                <button
                  type="submit"
                  className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-lg rounded-xl transition-all duration-300 mt-2 shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:shadow-[0_0_25px_rgba(245,158,11,0.4)]"
                >
                  Submit Request
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
